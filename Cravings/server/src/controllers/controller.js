import User from "../models/userModel.js";
import bcrypt from 'bcrypt';

export const UserRegister = async (req, res, next) => {
  try {
    const { fullName, email, mobileNumber, password } = req.body;
    if (!fullName || !email || !mobileNumber || !password) {
      const error = new Error("All feilds required");
      error.statusCode = 400;
      return next(error);
    }
    // const existingUser = await UserLogin.

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("Email already registered");
      error.statusCode = 409;
      return next(error);
    }
    const masala = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, masala);


    //save data to data base
    const newUser = await User.create({
      fullName,
      email,
      mobileNumber,
      password: hashPassword,
    });

    //send response to frontend

    console.log(newUser);
    res.status(201).json({ message: "Registration Sucessfull" });
    //end
  } catch (error) {
    next(error);
  }
}
export const UserLogin = async (req, res, next) => {
  try {

  } catch (error) {
    next(error)
  }
}
export const UserLogout = async (req, res, next) => {
  try {

  } catch (error) {
    next(error)
  }
}