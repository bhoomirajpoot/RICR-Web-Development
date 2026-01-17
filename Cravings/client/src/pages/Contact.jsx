import Contact from "../models/contactModel.js";

export const newContact = async (req, res, next) => {
  try {
    const { fullName, email, mobile, message } = req.body;

    if (!fullName || !email || !mobile || !message) {
      const error = new Error("All Fields Required");
      error.statusCode = 400;
      return next(error);
    }

    const newContact = await Contact.create({
      fullName,
      email,
      mobile,
      message,
    });

    console.log(newContact);
    res.status(201).json({
      message: "Thanks for contacting us, we will get back to you in 24 hours",
    });
  } catch (error) {
    next(error);
  }
};
