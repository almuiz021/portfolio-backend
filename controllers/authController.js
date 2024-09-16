const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Users = require('../models/users');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET_TOKEN, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.registerUser = async (req, res) => {
  const { first_name, last_name, username, email, password, role } = req.body;

  try {
    const existingUsername = await Users.findOne({ where: { username } });
    const existingUserMail = await Users.findOne({ where: { email } });
    if (existingUsername) {
      return res.status(404).json({
        status: 'Fail',
        message: 'Username is taken',
      });
    }
    if (existingUserMail) {
      return res.status(404).json({
        status: 'Fail',
        message: 'UserMail is taken',
      });
    }

    const newUser = await Users.create({
      first_name,
      last_name,
      username,
      email,
      password,
      role,
    });

    const token = signToken(newUser.id);
    res.status(201).json({
      data: 'success',
      message: 'User Registered',
      token,
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username } });

  if (!user || !(await user.validPassword(password, user.password))) {
    return res.status(401).json({
      status: 'Fail',
      message: 'Incorrect Username or Password',
    });
  }

  const token = signToken(user.id);
  console.log(user);
  res.status(200).json({
    status: 'Success',
    message: 'Logged In',
    token,
    data: user,
  });
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'Fail',
        message: 'Log In to Your Account',
      });
    }

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_TOKEN,
    );

    const currentUser = await Users.findByPk(decoded.id);

    if (!currentUser) {
      return res.status(401).json({
        status: 'Fail',
        message: 'The user belonging to this token does not exist.',
      });
    }

    req.user = currentUser;
    next();
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      status: 'Fail',
      message: 'Error',
    });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      console.log(req.user);
      return res.status(403).json({
        status: 'fail',
        message: `You are not Authorized as you are a ${req.user.role}`,
      });
    }
    next();
  };
};
