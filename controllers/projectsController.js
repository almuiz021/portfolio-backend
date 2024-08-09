const Projects = require('../models/projects');
const TechUsed = require('../models/techused');

exports.createProjects = async (req, res) => {
  const { projects } = req.body;

  try {
    for (const eachProj of projects) {
      const { imageURL, title, description, projectURL, techuseds } = eachProj;
      const myProjects = await req.user.createProject({
        imageURL,
        title,
        description,
        projectURL,
      });

      for (const techsObj of techuseds) {
        const { tech } = techsObj;
        const myTechUsed = myProjects.createTechused({
          tech,
          projectId: myProjects.id,
        });
      }
    }
    const data = await Projects.findAll({
      where: { userId: req.user.id },
      include: { model: TechUsed },
    });

    return res.status(200).json({
      status: 'Success',
      message: 'Created Projects',
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      status: 'Fail',
      message: 'Cannot Create Projects',
    });
  }
};

exports.updateProjects = async (req, res) => {
  const { projects } = req.body;

  try {
    for (const proj of projects) {
      const { imageURL, title, description, projectURL, id, techuseds } = proj;

      const myExistingProject = await Projects.findOne({
        where: {
          userId: req.user.id,
          id,
        },
      });

      if (myExistingProject) {
        myExistingProject.imageURL = imageURL || myExistingProject.imageURL;
        myExistingProject.title = title || myExistingProject.title;
        myExistingProject.description =
          description || myExistingProject.description;
        myExistingProject.projectURL =
          projectURL || myExistingProject.projectURL;
      }

      await myExistingProject.save();

      for (const techObj of techuseds) {
        const myTechs = await TechUsed.findOne({
          where: {
            id: myTechs.id,
            projectId: myExistingProject.id,
          },
        });

        await myTechs.update({
          tech: techObj.tech,
          projectId: myExistingProject.id,
        });
      }
    }
    const updatedProj = await Projects.findAll({
      where: { userId: req.user.id },
      include: { model: TechUsed },
    });

    res.status(200).json({
      status: 'Success',
      message: 'Updated Projects',
      data: updatedProj,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      status: 'Fail',
      message: 'Unable to Update Projects',
    });
  }
};
