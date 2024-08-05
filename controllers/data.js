const Home = require('../models/home');
const Socials = require('../models/socials');
const Users = require('../models/users');

// /api/test/all

exports.getAllData = async (req, res, next) => {
  const users = await Users.findAll({
    include: [
      {
        model: Home,
        include: [Socials],
      },
    ],
  });

  res.status(200).json({
    route: 'getAllData',
    data: users,
  });
};

exports.getAllUserData = async (req, res, next) => {
  const id = +req.params.id;

  const user = await Users.findByPk(id, {
    include: [
      {
        model: Home,
        include: [Socials],
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    route: 'getAllUserData',
    data: user,
  });
};
