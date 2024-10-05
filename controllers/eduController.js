const Educations = require('../models/education');

exports.createEducation = async (req, res) => {
  const { education } = req.body;

  try {
    for (const eachEdu of education) {
      const { degree, university, yearStarted, yearEnded, course } = eachEdu;
      const myEdu = await req.user.createEducation({
        degree,
        university,
        yearStarted,
        yearEnded,
        course,
      });
    }
    const data = await Educations.findAll({
      where: { userId: req.user.id },
    });

    if (data && data.length > 0) {
      return res.status(200).json({
        status: 'Success',
        message: 'Created Education',
        data,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      status: 'Fail',
      message: 'Cannot Create Educations',
    });
  }
};

exports.updateEducation = async (req, res) => {
  const { education } = req.body;

  try {
    for (const eachEdu of education) {
      const { degree, university, yearStarted, yearEnded, id, course } =
        eachEdu;

      let myExistingEducation;
      if (id) {
        myExistingEducation = await Educations.findOne({
          where: {
            userId: req.user.id,
            id,
          },
        });

        if (myExistingEducation) {
          myExistingEducation.degree = degree || myExistingEducation.degree;
          myExistingEducation.university =
            university || myExistingEducation.university;
          myExistingEducation.yearStarted =
            yearStarted || myExistingEducation.yearStarted;
          myExistingEducation.yearEnded =
            yearEnded || myExistingEducation.yearEnded;
          myExistingEducation.course = course || myExistingEducation.course;
          await myExistingEducation.save();
        }
      } else {
        const myEdu = await req.user.createEducation({
          degree,
          university,
          yearStarted,
          yearEnded,
          course,
          userId: req.user.id,
        });
      }
    }
    const updatedEdu = await Educations.findAll({
      where: { userId: req.user.id },
    });

    res.status(200).json({
      status: 'Success',
      message: 'Updated Educations',
      data: updatedEdu,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      status: 'Fail',
      message: 'Unable to Update Educations',
    });
  }
};

exports.getAllEducations = async (req, res) => {
  try {
    const myEducations = await req.user.getEducations();

    if (myEducations && myEducations.length > 0) {
      return res.status(200).json({
        status: 'Success',
        message: 'Fetched all Educations',
        data: myEducations,
      });
    }

    return res.status(404).json({
      status: 'Fail',
      message: 'No Educations Available',
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'Fail',
      message: 'Cannot Get Educations',
    });
  }
};

exports.getEducation = async (req, res) => {
  const educationID = +req.params.id;
  try {
    const myEducation = await req.user.getEducations({
      where: { id: educationID },
    });

    res.status(200).json({
      status: 'Success',
      message: 'Fetched project',
      data: myEducation,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'Fail',
      message: 'Cannot Get Education',
    });
  }
};

exports.deleteProject = async (req, res) => {
  const projID = +req.params.id;
  try {
    const [myEducation] = await req.user.getProjects({
      where: { id: projID },
      include: { model: TechUsed },
    });

    await myEducation.destroy();

    res.status(204).json({
      status: 'Success',
      message: 'deleted project',
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'Fail',
      message: 'Cannot delete Project',
    });
  }
};
