const AboutMe = require('../models/aboutme');
const ContactMe = require('../models/contactme');
const Duties = require('../models/duties');
const Experience = require('../models/experience');
const Home = require('../models/home');
const Projects = require('../models/projects');
const Socials = require('../models/socials');
const TechnicalSkills = require('../models/technicalskills');
const TechUsed = require('../models/techused');
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
      {
        model: AboutMe,
        include: [TechnicalSkills],
      },
      {
        model: Experience,
        include: [Duties],
      },
      {
        model: Projects,
        include: [TechUsed],
      },
      {
        model: ContactMe,
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    route: 'getAllUserData',
    data: [user],
  });
};

exports.getAllUserDataByUserName = async (req, res, next) => {
  const username = req.params.username;

  try {
    const user = await Users.findOne({
      where: { username },
      attributes: { exclude: ['password'] }, // Exclude the password field
      include: [
        {
          model: Home,
          include: [Socials],
        },
        {
          model: AboutMe,
          include: [TechnicalSkills],
        },
        {
          model: Experience,
          include: [Duties],
        },
        {
          model: Projects,
          include: [TechUsed],
        },
        {
          model: ContactMe,
        },
      ],
    });

    if (user) {
      return res.status(200).json({
        status: 'success',
        route: 'getAllUserDataByUserName',
        data: [user],
      });
    }

    return res.status(404).json({
      status: 'fail',
      route: 'getAllUserDataByUserName',
      message: 'NO USER AVAILABLE',
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'Fail',
      message: 'Cannot Find the Users Data',
      error,
    });
  }
};
