const Duties = require('../models/duties');

exports.deleteDuty = async (req, res) => {
  const id = +req.params.id;

  try {
    const myDuty = await Duties.findOne({
      where: { userId: req.user.id, id },
    });

    await myDuty.destroy();
    // console.log(myDuty);

    return res.status(204).json({
      status: 'Success',
      message: 'Deleted Duty ',
      data: myDuty,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'Fail',
      message: 'Cannot Delete Duty ',
    });
  }
};
