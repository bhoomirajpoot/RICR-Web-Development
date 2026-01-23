export const UserUpdate = async (req, res, next) => {
  try {

    const { fullNmae, email, mobileNumber } = req.body()
    const currentUser = req.user;
    if (!fullNmae || !email || !mobileNumber) {
      const error = new error("All Fields Required")
      error.statusCode = 400;
      return next(error);
    }

    console.log("OldData:",currentUser);

    currentUser.fullNmae = fullNmae;
    currentUser.email=email;
    currentUser.mobileNumber=mobileNumber;
    await currentUser.save();

    console.log("NewData:",currentUser);

  

    res.status(200)
    .json({message: "User upload sucessfully", data: currentUser});


    console.log("Updating the user:");
  } catch (error) {
    next(error);
  }
};