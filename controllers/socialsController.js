const Socials = require('../models/socials');

exports.addSocials = async (req, res) => {
  const { socials } = req.body;

  try {
    const myHome = await req.user.getHome();

    if (!myHome) {
      res.status(400).json({
        status: 'Fail',
        message: 'Home Not Found',
      });
    }

    const socialInstances = [];
    for (const social of socials) {
      const newSocial = await Socials.create({
        ...socials,
        homeId: myHome.id,
      });
      socialInstances.push(newSocial);
    }

    res.status(200).json({
      status: 'success',
      message: 'Socials Added',
      data: socialInstances,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
    });
  }
};
