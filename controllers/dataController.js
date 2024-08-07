const AboutMe = require('../models/aboutme');
const ContactMe = require('../models/contactme');
const Duties = require('../models/duties');
const Experience = require('../models/experience');
const Home = require('../models/home');
const Projects = require('../models/projects');
const Socials = require('../models/socials');
const TechnicalSkills = require('../models/technicalSkills');
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
