const { where } = require('sequelize');
const Duties = require('../models/duties');
const Experience = require('../models/experience');

exports.createExp = async (req, res) => {
  const { experience } = req.body;
  try {
    for (const exp of experience) {
      const { companyName, started, finished, designation, duties } = exp;

      const myExp = await req.user.createExperience({
        companyName,
        started,
        finished,
        designation,
        userId: req.user.id,
      });

      if (duties && duties.length > 0) {
        for (const duty of duties) {
          await myExp.createDuty({
            duty: duty.duty,
            userId: req.user.id,
            experienceId: myExp.id,
          });
        }
      }
    }

    const myAllExp = await Experience.findAll({
      where: { userId: req.user.id },
      include: { model: Duties },
    });

    if (myAllExp) {
      return res.status(201).json({
        status: 'Success',
        message: 'Created Experiences',
        data: myAllExp,
      });
    }

    return res.status(404).json({
      status: 'Fail',
      message: 'Experience Not Created',
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      status: 'Fail',
      message: 'Unable to Create Experiences',
    });
  }
};

exports.update_createExp = async (req, res) => {
  const { experience } = req.body;

  try {
    for (const exp of experience) {
      const { companyName, started, finished, designation, id, duties } = exp;

      let existingExp;

      if (id) {
        existingExp = await Experience.findOne({
          where: {
            id,
            userId: req.user.id,
          },
        });

        if (existingExp) {
          existingExp.companyName = companyName || existingExp.companyName;
          existingExp.started = started || existingExp.started;
          existingExp.finished = finished || existingExp.finished;
          existingExp.designation = designation || existingExp.designation;

          await existingExp.save();
        }
      } else {
        existingExp = await Experience.create({
          companyName,
          started,
          finished,
          designation,
          userId: req.user.id,
        });
      }

      if (duties && duties.length > 0) {
        for (const dutyObj of duties) {
          let myDuty;

          if (dutyObj.id) {
            myDuty = await Duties.findOne({
              where: {
                id: dutyObj.id,
                experienceId: existingExp.id,
              },
            });

            if (myDuty) {
              await myDuty.update({
                duty: dutyObj.duty,
              });
            }
          } else {
            await Duties.create({
              duty: dutyObj.duty,
              experienceId: existingExp.id,
              userId: req.user.id,
            });
          }
        }
      }
    }

    const updatedExper = await Experience.findAll({
      where: { userId: req.user.id },
      include: { model: Duties },
    });

    res.status(201).json({
      status: 'Success',
      message: 'Updated Experiences',
      data: updatedExper,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      status: 'Fail',
      message: 'Unable to Update Experiences',
    });
  }
};

exports.updateExp = async (req, res) => {
  const { experience } = req.body;

  try {
    for (const exp of experience) {
      const { companyName, started, finished, designation, id, duties } = exp;

      const existingExp = await Experience.findOne({
        where: {
          id: id,
          userId: req.user.id,
        },
      });

      if (existingExp) {
        (existingExp.companyName = companyName || existingExp.companyName),
          (existingExp.started = started || existingExp.started),
          (existingExp.finished = finished || existingExp.finished),
          (existingExp.designation = designation || existingExp.designation);

        await existingExp.save();

        if (duties && duties.length > 0) {
          for (const dutyObj of duties) {
            const myDuty = await Duties.findOne({
              where: {
                id: dutyObj.id,
                experienceId: existingExp.id,
              },
            });

            await myDuty.update({
              duty: dutyObj.duty,
              experienceId: existingExp.id,
            });
          }
        }
      }
    }

    const updatedExper = await Experience.findAll({
      where: { userId: req.user.id },
      include: { model: Duties },
    });

    res.status(202).json({
      status: 'Success',
      message: 'Updated Experiences',
      data: updatedExper,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      status: 'Fail',
      message: 'Unable to Update Experiences',
    });
  }
};

exports.getAllExp = async (req, res) => {
  try {
    const myAllExp = await Experience.findAll({
      where: { userId: req.user.id },
      include: { model: Duties },
    });

    if (myAllExp && myAllExp.length > 0) {
      return res.status(201).json({
        status: 'Success',
        message: 'Created Experiences',
        data: myAllExp,
      });
    }

    // return res.status(404).json({
    //   status: 'Fail',
    //   message: 'Experience Not Found',
    // });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      status: 'Fail',
      message: 'Unable to Get Experiences',
    });
  }
};

exports.deleteExp = async (req, res) => {
  const expID = +req.params.id;
  try {
    const [myExp] = await Experience.findAll({
      where: {
        userId: req.user.id,
        id: expID,
      },
      include: { model: Duties },
    });

    const [myDutiesDelete] = await Duties.findAll({
      where: {
        experienceId: expID,
        userId: req.user.id,
      },
    });

    if (myDutiesDelete) {
      await myDutiesDelete.destroy();
    }
    await myExp.destroy();

    res.status(204).json({
      status: 'Success',
      message: 'Deleted',
      data: myExp,
      dutyData: myDutiesDelete,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      status: 'Fail',
      message: 'Unable to Delete Experiences',
    });
  }
};

exports.getExp = async (req, res) => {
  const expID = +req.params.id;
  try {
    const myExp = await req.user.getExperiences({
      where: { id: expID },
      include: { model: Duties },
    });

    res.status(200).json({
      status: 'Success',
      message: 'Got Experience',
      data: myExp,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      status: 'Fail',
      message: 'Unable to Get Experiences',
    });
  }
};
