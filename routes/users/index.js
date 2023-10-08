const express = require('express');
const userRouter = express.Router();
const { registerUser } = require('./../../controllers/Users/registerUser');
const loginUser = require('./../../controllers/Users/loginUser');
const {
  verifyOTPAndRegisterUser,
} = require('./../../controllers/Users/registerUser');
const {calendarSync,getEventList} = require('./../../controllers/Users/calendarSync')


const userList = require('./../../controllers/Users/userList');

userRouter.post('/register', registerUser);
userRouter.post('/verifyUser', verifyOTPAndRegisterUser);
userRouter.post('/login', loginUser);
userRouter.post('/work',calendarSync)
userRouter.post('/geteventlist',getEventList)
userRouter.get('/getAllUsers', userList);

module.exports = userRouter;
