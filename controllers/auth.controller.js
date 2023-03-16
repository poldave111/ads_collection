const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { login, password } = req.body;
        if (login && typeof login === 'string' && password && typeof password === 'string') {
            const userWithLogin = await User.findOne({ login });
            if(userWithLogin) {
                res.status(409).send({ message: 'User already logged in.' });
            }
            const user = await new User.create({ login, password: await bcrypt.hash(password, 10) });
            res.status(201).send({ message: 'User added' + user.login});
        } else {
            res.status(400).send({ message: 'Bad request' });
        }
    } catch (e) {
        res.status(500).send({ message: e.message }); 
    }
}

exports.login = async (req, res) => {

}