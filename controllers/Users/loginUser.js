const bcrypt = require('bcryptjs');
const conn = require('../../db/conn');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');

const SECRET_KEy = 'HiiTHere';
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send({ message: 'Bad Request' });
    }

    const userLogin = await User.findOne({
      where: { email: email },
    });
    if (userLogin) {
      const validPassword = await bcrypt.compare(password, userLogin.password);
      const token = jwt.sign({ data: userLogin }, SECRET_KEy);
      console.log(token, 'token');
      console.log(validPassword, 'validPassword');
      res.cookie('jwt', token, { httpOnly: true });
      if (!validPassword) {
        res.status(400).send({ message: 'Invalid Username and Password' });
      } else {
        res.status(200).send({ message: 'Login Succesfully' });
      }
    } else {
      res.status(400).send({ message: 'User does not Exist' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Something went Wrong' });
    console.log(error);
  }
};

const userLogout = async (req, res) => {
  res.clearCookie('jwt');
  res.json({ message: 'you have logout' });
};

module.exports = loginUser;
