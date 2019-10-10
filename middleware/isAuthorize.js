module.exports = types => async (req, res, next) => {
  try {
    if (!types) {
      const error = new Error("No types");
      error.statusCode = 404;
      throw error;
    }
    if (!req.user) {
      const error = new Error("Not authenticated");
      error.statusCode = 401;
      throw error;
    }
    if (!types.includes(req.user.type)) {
      const error = new Error("Not Authorized");
      error.statusCode = 403;
      throw error;
    }
    next();
  } catch (err) {
    if (!err.statusCode) {
      console.log(err);
      res.status(500).end();
    } else {
      res.status(err.statusCode).json({ message: err.message });
    }
  }
};
