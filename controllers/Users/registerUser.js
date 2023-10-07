const bcrypt = require('bcryptjs');
const User = require('./../../models/User');

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, userName } = req.body;
    console.log(req.body, 'req.body');
    const otp = generateOTP();
    console.log(otp, 'OTP');
    const hash = await bcrypt.hash(password, 10);

    if (!name || !email || !password || !phoneNumber) {
      res.status(400).send({ message: 'Please fill all the properties' });
    } else {
      const userData = await User.create({
        name,
        email,
        password: hash,
        phoneNumber,
        userName,
        otp,
      });
      res.status(200).send(userData);
    }
  } catch (error) {
    res.status(400).send({ message: 'Bad Request' });
    console.log(error);
  }
};

const generateOTP = () => {
  const min = 100000;
  const max = 999999;
  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  let otp = randomNum.toString();
  while (otp.length < 6) {
    otp = '0' + otp;
  }
  return otp;
};

module.exports = registerUser;
