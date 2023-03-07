const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users.controller');

router.post('/auth/register', UsersController.register);

router.post('/auth/login', UsersController.login);

router.get('/auth/user', UsersController.get);

module.exports = router; 