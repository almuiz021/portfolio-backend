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
    const home = Users.getHome();

    if (!home) {
      res.status(404).json({
        status: 'Fail',
        message: 'Home Not Found',
      });
    }

    home.logoImgURL = logoImgURL;
    home.logoTextURL = logoTextURL;
    home.heroImageURL = heroImageURL;
    home.myRole = myRole;
    home.heroName = heroName;

    myUpdatedHome = await home.save();

    res.status(200).json({
      status: 'success',
      message: 'Data Created',
      data: myUpdatedHome,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      message: 'Error Updating Home Data',
    });
  }
};

exports.deleteHome = async (req, res) => {};
