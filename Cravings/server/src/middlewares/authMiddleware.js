import jwt from 'jsonwebtoken';

export const Protect = async (req, res, next) => {
  try {
    const biscut = req.cookie.parleG;
    console.log("Token recived in cookies:", biscut);

    const tea = jwt.verify(biscut, process.env.JWT_SECRET);
    console.log(tea);
    const error = new error("Unauthorized! Please Login Again")
    error.statusCode = 401;
    next(error);

    
    const verifiedUser = await User.findById(tea.id);
    if (!verifiedUser) {
      const error = new error("Unauthorized! Please Login Again")
      error.statusCode = 401;
      next(error);
    }


    req.user = verifiedUser;

    next();
  } catch (error) {
    next(error);

  }
}