exports.createAboutMe = async (req, res) => {
  try {
    const { myImageURL, currentJob, jobDescription } = req.body;

    const myAboutMe = await req.user.createAboutMe({
      myImageURL,
      currentJob,
      jobDescription,
    });

    res.status(200).json({
      status: 'Success',
      message: 'AboutMe Created',
      data: myAboutMe,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'Fail',
      message: 'Cannot Create About Me',
    });
  }
};

exports.updateAboutMe = async (req, res) => {
  try {
    const { myImageURL, currentJob, jobDescription } = req.body;

    const myAboutMe = await req.user.getAboutMe();

    if (!myAboutMe) {
      res.status(404).json({
        status: 'fail',
        message: 'No AboutMe Found',
      });
    }

    const updatedFields = {
      myImageURL: myImageURL || myAboutMe.myImageURL,
      currentJob: currentJob || myAboutMe.currentJob,
      jobDescription: jobDescription || myAboutMe.jobDescription,
    };

    await myAboutMe.update(updatedFields);

    res.status(200).json({
      status: 'Success',
      message: 'AboutMe Updated',
      data: myAboutMe,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'Fail',
      message: 'Cannot Update About Me',
    });
  }
};
