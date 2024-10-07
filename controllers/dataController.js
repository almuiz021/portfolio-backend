const AboutMe = require('../models/aboutme');
const ContactMe = require('../models/contactme');
const Duties = require('../models/duties');
const Educations = require('../models/education');
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
          model: Educations,
        },
        {
          model: ContactMe,
        },
      ],
    });

    if (user) {
      if (user.is_hosting) {
        return res.status(200).json({
          status: 'success',
          data: [user],
        });
      } else {
        return res.status(401).json({
          status: 'fail',
          message: 'User Inactive',
        });
      }
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

exports.updateHosting = async (req, res) => {
  const { is_hosting, port_no } = req.body;
  try {
    const user = req.user;

    const existingUser = await Users.findOne({
      where: { username: user.username },
    });

    console.log(existingUser);

    if (!existingUser) {
      return res.status(404).json({
        status: 'Fail',
        message: 'User not found',
      });
    }

    existingUser.is_hosting =
      is_hosting !== undefined ? is_hosting : existingUser.is_hosting;
    existingUser.port_no =
      port_no !== undefined ? port_no : existingUser.port_no;

    await existingUser.save();

    res.status(200).json({
      status: 'Success',
      message: 'HOSTING updated successfully',
      // user: existingUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'Fail',
      message: 'Cannot update user data',
      error,
    });
  }
};

exports.getHosting = async (req, res) => {
  try {
    const user = req.user;

    const existingUser = await Users.findOne({
      where: { username: user.username },
    });

    if (!existingUser) {
      return res.status(404).json({
        status: 'Fail',
        message: 'User not found',
      });
    }

    const { port_no, is_hosting } = existingUser;

    res.status(200).json({
      status: 'Success',
      message: 'HOSTING  DATA',
      // user: existingUser,
      data: {
        port_no,
        is_hosting,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'Fail',
      message: 'Cannot update user data',
      error,
    });
  }
};
