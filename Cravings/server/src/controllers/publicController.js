
import Contact from "../models/contactModel.js";

export const NewContact = async (req, res, next) => {
  try {
    const { fullName, email, mobile, message } = req.body;

    if (!fullName || !email || !mobile || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newContact = await Contact.create({
      fullName,
      email,
      mobile,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Thanks for contacting us, we will get back to you in 24 hours",
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};
