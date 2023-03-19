const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { login, password } = req.body; 
        if (login && typeof login === 'string' && password && typeof password === 'string') {
            const userWithLogin = await User.findOne({ login });
            if (userWithLogin) {
                return res.status(400).send({ message: 'User whit this login is already registered.'});
            }
    
            const user = await new User.create({ login, password: await bcrypt.hash(password, 10) });
            res.status(201).send({ message: 'User created' + user.login });
    
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
            const user = await User.findOne({ login });
            if (!user) {
                res.status(400).send({ message: 'Login or password are incorrect' });
            }
            else {
                if (bcrypt.compareSync(password, user.password)) {
                    res.status(200).send({ message: 'Login successful' });
                }
                else {
                    res.status(400).send({ message: 'Login or password are incorrect'});
                }
            }
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}