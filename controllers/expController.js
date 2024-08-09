const Duties = require('../models/duties');
const Experience = require('../models/experience');

exports.createExp = async (req, res) => {
  const { experiences } = req.body;
  try {
    for (const exp of experiences) {
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

    const myAllExp = await req.user.getExperiences({
      include: { model: Duties },
    });

    res.status(201).json({
      status: 'Success',
      message: 'Created Experiences',
      data: myAllExp,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      status: 'Fail',
      message: 'Unable to Create Experiences',
    });
  }
};

exports.updateExp = async (req, res) => {
  const { experiences } = req.body;

  try {
    for (const exp of experiences) {
      const { companyName, started, finished, designation, id, duties } = exp;

      const existingExp = await Experience.findOne({
        where: { id, userId: req.user.id },
      });

      if (existingExp) {
        (existingExp.companyName = companyName || existingExp.companyName),
          (existingExp.started = started || existingExp.started),
          (existingExp.finished = finished || existingExp.finished),
          (existingExp.designation = designation || existingExp.designation);

        await existingExp.save();

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
