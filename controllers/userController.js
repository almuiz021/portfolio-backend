const Users = require('../models/users');

// /api/test/users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await Users.findAll();

    res.status(200).json({
      status: 'success',
      route: 'getAllUsers',
      data: {
        user: users,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
};

// / POST: /api/test/users
exports.createUser = async (req, res, next) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  try {
    const newUser = await Users.create({
      first_name,
      last_name,
      username,
      email,
      password,
    });

    res.status(200).json({
      data: 'success',
      route: 'POST: createUser',
      message: 'User Created',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
};

// /CHECK USERNAME
exports.checkUserExists = async (req, res, next, val) => {
  const username = req.params.username;
  console.log(username);
  try {
    const user = await Users.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User Not Found',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
};

// /api/test/users/muiz
exports.getUserbyName = (req, res) => {
  res.status(200).json({
    status: 'success',
    route: 'getUserbyName',
    data: req.user,
  });
};

exports.updateUser = async (req, res) => {
  const { first_name, last_name, username, email, password } = req.body;

  try {
    const user = req.user;

    if (username && username !== user.username) {
      const existingUser = await Users.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({
          status: 'fail',
          message: 'Username Already Exists',
        });
      }
    }

    user.first_name = first_name || user.first_name;
    user.last_name = last_name || user.last_name;
    user.username = username || user.username;
    user.password = password || user.password;
    user.email = email || user.email;

    const updatedUser = await user.save();

    res.status(200).json({
      status: 'success',
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
};

exports.deleteUser = async (req, res) => {
  const user = req.user;

  await user.destroy();

  res.status(204).json({
    status: 'Success',
    message: 'User Deleted',
  });
};

// /api/test/users/1
exports.getUser = async (req, res) => {
  const id = +req.params.id;
  try {
    const user = await Users.findByPk(id);

    res.status(200).json({
      status: 'success',
      route: 'getUser',
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
};
