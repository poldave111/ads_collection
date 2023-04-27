const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');

exports.register = async (req, res) => {
    try {
        const { login, password, phone } = req.body; 
        const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

        if (login && typeof login === 'string' && password && typeof password === 'string' && req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType))  {
            const userWithLogin = await User.findOne({ login });
            if (userWithLogin) {
                return res.status(400).send({ message: 'User whit this login is already registered.'});
            }
    
            const user = await User.create(
                { login, 
                password: await bcrypt.hash(password, 10), 
                avatar: req.file.filename,
                phone,
            });
            res.status(201).send({ message: 'User created ' + user.login });
    
        }  else {
            res.status(400).send({message: 'Bad request'});
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { login, password } = req.body; 
        if (login && typeof login === 'string' && password && typeof password === 'string') {
            const userWithLogin = await User.findOne({ login });
            if (!userWithLogin) {
                res.status(400).send({ message: 'Login or password are incorrect' });
            }
            else {
                if (bcrypt.compareSync(password, userWithLogin.password)) {
                    req.session.login = userWithLogin.login, req.session.id = userWithLogin.id;

                    res.status(200).send({ message: 'Login successful' });
                }
                else {
                    res.status(400).send({ message: 'Login or password are incorrect'});
                }
            }
        } else {
            res.status(400).send({ message: 'Bad request' });
        } 
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getUser = async (req, res) => {
    res.send('I\'m logged in');
}

exports.delete = async (req, res) => {
    req.session.destroy();
}