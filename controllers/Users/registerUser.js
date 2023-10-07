const bcrypt = require('bcryptjs');
const User = require('./../../models/User');
const verifyUser = require('./../../utils/sendMail');

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
      const response = await verifyUser(email, true, otp);

      const userData = await User.create({
        name,
        email,
        password: hash,
        phoneNumber,
        userName,
        otp,
      });

      res.status(201).send({
        message: 'OTP sent to your email. Please verify.',
        userData: {
          name,
          email,
          phoneNumber,
          userName,
        },
      });
    }
  } catch (error) {
    res.status(400).send({ message: 'Bad Request' });
    console.log(error);
  }
};

const verifyOTPAndRegisterUser = async (req, res) => {
  try {
    const { email, otp } = req.body;

    console.log(req.body);

    const user = await User.findOne({ where: { email } });

    console.log(user, 'user');
    if (!user) {
      return res.status(400).send({ message: 'Invalid OTP' });
    }

    const hash = await bcrypt.hash(user.password, 10);

    await user.destroy();
    await User.create({
      name: user.name,
      email: user.email,
      password: hash,
      phoneNumber: user.phoneNumber,
      userName: user.userName,
      otp: otp,
    });

    res.status(200).send({ message: 'User registered successfully' });
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

module.exports = { registerUser, verifyOTPAndRegisterUser };
