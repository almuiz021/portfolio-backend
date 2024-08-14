const bcrypt = require('bcryptjs');
const Users = require('../models/users');

exports.registerUser = async (req, res) => {
  const { first_name, last_name, username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await Users.create({
      first_name,
      last_name,
      username,
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      data: 'success',
      route: 'POST: createUser',
      message: 'User Created',
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
