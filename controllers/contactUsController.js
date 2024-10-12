const ContactUs = require('../models/contactUs');

exports.getContactUs = async (req, res) => {
  try {
    const allContactUs = await ContactUs.findAll();
    if (allContactUs) {
      return res.status(200).json({
        status: 'Success',
        message: 'Got Contact Us',
        data: allContactUs,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'Fail',
      message: 'Cannot Get ContactUs',
    });
  }
};

exports.createContactUs = async (req, res) => {
  const { name, emailAddress, message } = req.body;
  try {
    const contactUsData = await ContactUs.create({
      name,
      emailAddress,
      message,
    });

    return res.status(200).json({
      status: 'Success',
      message: 'Created Contact Us',
      data: contactUsData,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      status: 'Fail',
      message: 'Unable to Create ContactUs',
    });
  }
};
