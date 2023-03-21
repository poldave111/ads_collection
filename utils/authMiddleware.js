const authMiddleware = (req, res, next) => {
    if (req.session.login) {
        //res.status(200).send({ login: req.session.login });
        next();
    } else {
        res.status(401).send({ message: 'You don\'t have access.' });
    }
}

module.exports = authMiddleware;