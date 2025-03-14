const AboutMe = require('../models/aboutme');
const TechnicalSkills = require('../models/technicalskills');

exports.getSkills = async (req, res) => {
  try {
    const myAboutMe = await AboutMe.findOne({ where: { userId: req.user.id } });

    const mySkills = await TechnicalSkills.findAll({
      where: { AboutMeId: myAboutMe.id },
    });

    if (mySkills && mySkills.length > 0) {
      return res.status(200).json({
        status: 'Success',
        message: 'Fetched Technical Skills of the User',
        data: mySkills,
      });
    }

    return res.status(404).json({
      status: 'Fail',
      message: 'No Technical skills available',
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      status: 'Fail',
      message: 'Failed to Get Technical skills',
    });
  }
};

exports.createSkills = async (req, res) => {
  const { skills } = req.body;
  try {
    const myAboutMe = await AboutMe.findOne({ where: { userId: req.user.id } });

    if (!myAboutMe) {
      return res.status(404).json({
        status: 'Fail',
        message: 'AboutMe Not Available to Create Skills',
      });
    }

    const skillsInstance = [];
    for (const skill of skills) {
      const myNewSkill = await TechnicalSkills.create({
        ...skill,
        AboutMeId: myAboutMe.id,
      });
      skillsInstance.push(myNewSkill);
    }

    res.status(200).json({
      status: 'Success',
      message: 'Success Fully Created The Skills',
      data: skillsInstance,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'Fail',
      message: "Can't Create Skills",
    });
  }
};

exports.updateSkills = async (req, res) => {
  const { skills } = req.body;
  try {
    const myAboutMe = await req.user.getAboutMe();

    for (const mySkill of skills) {
      const { skillTitle, id, AboutMeId } = mySkill;

      let existingSkills;

      if (id) {
        existingSkills = await TechnicalSkills.findOne({
          where: { id, AboutMeId },
        });

        if (existingSkills) {
          existingSkills.skillTitle = skillTitle || existingSkills.skillTitle;
          await existingSkills.save();
        }
      } else {
        await TechnicalSkills.create({
          skillTitle,
          AboutMeId: myAboutMe.id,
        });
      }
    }

    const updatedSkills = await TechnicalSkills.findAll({
      where: { AboutMeId: myAboutMe.id },
    });

    res.status(200).json({
      status: 'success',
      message: 'Updated Skills',
      data: updatedSkills,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      status: 'Fail',
      message: 'Cannot Update Skills',
    });
  }
};

exports.deleteSkills = async (req, res) => {
  const id = +req.params.id;

  try {
    const aboutMe = await AboutMe.findOne({
      where: { userId: req.user.id },
      attributes: ['id'],
    });

    const mySkill = await TechnicalSkills.findOne({
      where: { AboutMeId: aboutMe.id, id },
    });

    await mySkill.destroy();

    await res.status(204).json({
      status: 'Success',
      message: 'Deleted Skill ',
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'Fail',
      message: 'Cannot Delete Socials ',
    });
  }
};
