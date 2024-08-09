const Home = require('../models/home');

exports.addHome = async (req, res) => {
  const { logoImgURL, logoTextURL, heroImageURL, myRole, heroName } = req.body;

  try {
    const myHome = await req.user.createHome({
      logoImgURL,
      logoTextURL,
      heroImageURL,
      myRole,
      heroName,
    });

    res.status(200).json({
      status: 'success',
      message: 'Data Created',
      data: myHome,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
    });
  }
};

exports.updateHome = async (req, res) => {
  const { logoImgURL, logoTextURL, heroImageURL, myRole, heroName } = req.body;

  try {
    const myHome = req.user.getHome();

    if (!myHome) {
      res.status(404).json({
        status: 'Fail',
        message: 'Home Not Found',
      });
    }
    const updatedFields = {
      logoImgURL: logoImgURL || myHome.logoImgURL,
      logoTextURL: logoTextURL || myHome.logoTextURL,
      heroImageURL: heroImageURL || myHome.heroImageURL,
      myRole: myRole || myHome.myRole,
      heroName: heroName || myHome.heroName,
    };

    await Home.update(updatedFields, { where: { userId: req.user.id } });

    const updatedHome = await Home.findByPk(req.user.id);

    res.status(200).json({
      status: 'success',
      message: 'Data Updated',
      data: updatedHome,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      message: 'Error Updating Home Data',
      data: req.body,
    });
  }
};

exports.deleteHome = async (req, res) => {};
