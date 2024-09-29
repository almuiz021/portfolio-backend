const ContactMe = require('../models/contactme');

exports.createContacts = async (req, res) => {
  const { phoneNo, emailAddress, homeAddress } = req.body;
  try {
    await ContactMe.create({
      phoneNo,
      emailAddress,
      homeAddress,
      userId: req.user.id,
    });

    const contactMeData = await ContactMe.findOne({
      where: { userId: req.user.id },
    });

    return res.status(200).json({
      status: 'Success',
      message: 'Created Contacts',
      data: contactMeData,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      status: 'Fail',
      message: 'Unable to Create ContactUs',
    });
  }
};

exports.updateContacts = async (req, res) => {
  const { phoneNo, emailAddress, homeAddress } = req.body;
  try {
    const myContactMe = ContactMe.findAll({ where: { userId: req.user.id } });

    const updatedFields = {
      phoneNo: phoneNo || myContactMe.phoneNo,
      emailAddress: emailAddress || myContactMe.emailAddress,
      homeAddress: homeAddress || myContactMe.homeAddress,
    };

    await ContactMe.update(updatedFields, { where: { userId: req.user.id } });

    const updatedData = await ContactMe.findOne({
      where: { userId: req.user.id },
    });

    return res.status(202).json({
      status: 'Success',
      message: 'Updated ContactMe',
      data: updatedData,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      status: 'Fail',
      message: 'Unable to Update ContactUs',
    });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const myContactMe = await ContactMe.findOne({
      where: { userId: req.user.id },
    });
    if (myContactMe) {
      return res.status(200).json({
        status: 'Success',
        message: 'Got Contact Me',
        data: myContactMe,
      });
    }

    // return res.status(404).json({
    //   status: 'Fail',
    //   message: 'No Contact Me Available ',
    // });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'Fail',
      message: 'Cannot Get ContactMe',
    });
  }
};

exports.deleteContacts = async (req, res) => {
  try {
    const myContactMe = await ContactMe.findOne({
      where: { userId: req.user.id },
    });

    await myContactMe.destroy();

    res.status(204).json({
      status: 'Success',
      message: 'Deleted Contact Me',
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'Fail',
      message: 'Cannot Delete Contact Me',
    });
  }
};
