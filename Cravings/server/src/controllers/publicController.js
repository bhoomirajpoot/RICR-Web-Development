import Contact from "../models/contactModel.js";

export const NewContact = async (req, res, next) => {
  try {
    const { fullName, email, mobile, message } = req.body;

    if (!fullName || !email || !mobile || !message) {
      const error = new error("All Field Required")
      error.statusCode = 400;
      return next(error);
    }

    const newContact = await Contact.create({
      
      mobileNumber,
      message,
    });

    console.log(newContact);
    res.status(201)
    .json({
      message: "Thanks for conatacting us, we will get back to you in 24 hours"
    });
  } catch (error) {
    next(error);
  }
}

export default Controllers;