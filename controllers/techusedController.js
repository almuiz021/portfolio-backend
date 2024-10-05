const Duties = require('../models/duties');
const TechUsed = require('../models/techused');

exports.deleteTechUsed = async (req, res) => {
  const id = +req.params.id;

  try {
    const myTechUsed = await TechUsed.findOne({
      //   where: { id },
      where: { userId: req.user.id, id },
    });

    await myTechUsed.destroy();
    // console.log(myTechUsed);

    return res.status(204).json({
      status: 'Success',
      message: 'Deleted Tech Used ',
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'Fail',
      message: 'Cannot Delete Tech ',
    });
  }
};
