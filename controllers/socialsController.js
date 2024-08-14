const Home = require('../models/home');
const Socials = require('../models/socials');

exports.addSocials = async (req, res) => {
  const { socials } = req.body;

  try {
    const myHome = await req.user.getHome();

    if (!myHome) {
      return res.status(400).json({
        status: 'Fail',
        message: 'Home Not Found',
      });
    }

    const socialInstances = [];
    for (const social of socials) {
      const newSocial = await Socials.create({
        ...social,
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
    return res.status(400).json({
      status: 'fail',
    });
  }
};

exports.updateSocials = async (req, res) => {
  const { socials } = req.body;
  try {
    const myHome = await req.user.getHome();

    if (!myHome) {
      return res.status(400).json({
        status: 'Fail',
        message: 'Home Not Found',
      });
    }

    for (const social of socials) {
      const { socialMediaName, socialMediaLogo, socialMediaURL, id } = social;
      if (id) {
        const existingSocial = await Socials.findOne({
          where: { id, homeId: myHome.id },
        });

        if (existingSocial) {
          (existingSocial.socialMediaName =
            socialMediaName || existingSocial.socialMediaName),
            (existingSocial.socialMediaLogo =
              socialMediaLogo || existingSocial.socialMediaLogo),
            (existingSocial.socialMediaURL =
              socialMediaURL || existingSocial.socialMediaURL);

          await existingSocial.save();
        } else {
          res.status(400).json({
            status: 'Fail',
            message: `No Social Found with id ${id}`,
          });
        }
      } else {
        await Socials.create({
          socialMediaName,
          socialMediaLogo,
          socialMediaURL,
          homeId: myHome.id,
        });
      }
    }

    const updatedSocials = await Socials.findAll({
      where: { homeId: myHome.id },
    });

    res.status(200).json({
      status: 'Success',
      message: 'Data Updated Successfully',
      data: updatedSocials,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      data: error,
    });
  }
};

exports.deleteSocial = async (req, res) => {
  const id = +req.params.id;

  try {
    const home = await Home.findOne({
      where: { userId: req.user.id },
      attributes: ['id'],
    });
    const mySocial = await Socials.findOne({
      where: { homeId: home.id, id },
    });

    await mySocial.destroy();

    await res.status(204).json({
      status: 'Success',
      message: 'Deleted social ',
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'Fail',
      message: 'Cannot Delete Socials ',
    });
  }
};
