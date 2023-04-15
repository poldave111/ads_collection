const express = require('express');
const path = require('path');
const app = express(); 
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const helmet = require('helmet');
const ads = require('./routes/ads.routes');
const auth = require('./routes/auth.routes');
const MongoStore = require('connect-mongo');

// connects our backend code with the database
mongoose.connect('mongodb+srv://davepol:Olivermuc1@davepolcluster.yn1hyo1.mongodb.net/ads_collection_db?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', err => console.log('Error ' + err));

db.once('open', () => {
  console.log('Connected to the database');
  
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(helmet({
    crossOriginResourcePolicy: false,
  }));

  if(process.env.NODE_ENV !== 'production') {
    app.use(
      cors({
        origin: ['http://localhost:3000'],
        credentials: true,
      })
    );
  }

  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/api/', ads);
  app.use('/api/auth', auth);
  app.use(session({
    secret: process.env.SESSION_SECRET || 'abc',
    store: MongoStore.create(mongoose.connection),
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV == 'production',
      }
    }
  ));
  app.use((req, res) => {
    res.status(404).json({message: 'error 404 - not found'});
  });
});

const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});



