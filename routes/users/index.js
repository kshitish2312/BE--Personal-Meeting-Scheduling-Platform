const express = require('express');
const userRouter = express.Router();
const Joi = require('joi');
const User = require('../../models/User');
const registerUser = require('./../../controllers/Users/registerUser');
const loginUser = require('./../../controllers/Users/loginUser');

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

module.exports = userRouter;
