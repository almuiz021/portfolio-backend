const Users = require('../models/users');

exports.checkEmail = async (req, res) => {
  const { email } = req.body;

  try {
    if (await Users.findOne({ where: { email } })) {
      return res.status(406).json({
        status: 'Failed',
        message: 'Email is in use Please Log In ',
      });
    }

    return res.status(200).json({
      status: 'Success',
      message: 'Email is Available ',
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      status: 'Fail',
      message: 'Failed to Check the Email',
    });
  }
};

exports.checkUsername = async (req, res) => {
  const { username } = req.body;

  try {
    if (await Users.findOne({ where: { username } })) {
      return res.status(406).json({
        status: 'Failed',
        message: 'Username is Not Available ',
      });
    }

    return res.status(200).json({
      status: 'Success',
      message: 'Username is Available ',
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      status: 'Success',
      message: 'Failed to Check the Username',
    });
  }
};
