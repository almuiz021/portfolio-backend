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

      if (techuseds && techuseds.length > 0) {
        for (const techsObj of techuseds) {
          const { tech } = techsObj;
          const myTechUsed = myProjects.createTechused({
            tech,
            projectId: myProjects.id,
          });
        }
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

exports.update_createProjects = async (req, res) => {
  const { projects } = req.body;

  try {
    for (const proj of projects) {
      const { imageURL, title, description, projectURL, id, techuseds } = proj;

      let myExistingProject;

      if (id) {
        myExistingProject = await Projects.findOne({
          where: {
            id,
            userId: req.user.id,
          },
        });

        if (myExistingProject) {
          myExistingProject.imageURL = imageURL || myExistingProject.imageURL;
          myExistingProject.title = title || myExistingProject.title;
          myExistingProject.description =
            description || myExistingProject.description;
          myExistingProject.projectURL =
            projectURL || myExistingProject.projectURL;
          await myExistingProject.save();
        }
      } else {
        myExistingProject = await Projects.create({
          imageURL,
          title,
          description,
          projectURL,
          userId: req.user.id,
        });
      }

      if (techuseds && techuseds.length > 0) {
        for (const techObj of techuseds) {
          let myTechs;

          if (techObj.id) {
            myTechs = await TechUsed.findOne({
              where: {
                id: techObj.id,
                projectId: myExistingProject.id,
              },
            });

            if (techObj) {
              await myTechs.update({
                tech: techObj.tech,
                projectId: myExistingProject.id,
              });
            }
          } else {
            await myExistingProject.createTechused({
              tech: techObj.tech,
              projectId: myExistingProject.id,
            });
          }
        }
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

      if (techuseds && techuseds.length > 0) {
        for (const techObj of techuseds) {
          const myTechs = await TechUsed.findOne({
            where: {
              id: techObj.id,
              projectId: myExistingProject.id,
            },
          });

          await myTechs.update({
            tech: techObj.tech,
            projectId: myExistingProject.id,
          });
        }
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

exports.getAllProjects = async (req, res) => {
  try {
    const myProjects = await req.user.getProjects({
      include: { model: TechUsed },
    });

    if (myProjects && myProjects.length > 0) {
      return res.status(200).json({
        status: 'Success',
        message: 'Fetched all Projects',
        data: myProjects,
      });
    }

    return res.status(404).json({
      status: 'Fail',
      message: 'No Projects Available',
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'Fail',
      message: 'Cannot Get Projects',
    });
  }
};

exports.getProject = async (req, res) => {
  const projID = +req.params.id;
  try {
    const myProject = await req.user.getProjects({
      where: { id: projID },
      include: { model: TechUsed },
    });

    res.status(200).json({
      status: 'Success',
      message: 'Fetched project',
      data: myProject,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'Fail',
      message: 'Cannot Get Projects',
    });
  }
};

exports.deleteProject = async (req, res) => {
  const projID = +req.params.id;
  try {
    const [myProject] = await req.user.getProjects({
      where: { id: projID },
      include: { model: TechUsed },
    });

    await myProject.destroy();

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
