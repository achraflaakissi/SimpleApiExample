const auth = require("../config/auth");
const User = require("../resources/user/user.model");

module.exports = async (req, res, next) => {
  const bearer = req.headers.authorization;
  try {
    if (!bearer || !bearer.startsWith("Bearer ")) {
      const error = new Error("Not authenticated.");
      error.statusCode = 401;
      throw error;
    }
    const token = bearer.split("Bearer ")[1].trim();
    const payload = await auth.verifyToken(token);
    if (!payload) {
      const error = new Error("Not authenticated token incorrect.");
      error.statusCode = 401;
      throw error;
    }
    const user = await User.findById(payload.id)
      .select("-password")
      .exec();

    if (!user) {
      const error = new Error("Login Or Password Incorrect.");
      error.statusCode = 401;
      throw error;
    }
    req.user = user;
    next();
  } catch (err) {
    if (!err.statusCode) {
      console.log(err.message);
      res.status(500).end();
    } else {
      res.status(err.statusCode).json({ message: err.message });
    }
  }
};
