import jwt from "jsonwebtoken";

const genToken = (user, res) => {
  const payload = {
    id: user._id,
    role: user.role || "user",
  };

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("parleG", token, {
    httpOnly: true,
    secure: false, // true in production
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  });

  return token;
};

export default genToken;
