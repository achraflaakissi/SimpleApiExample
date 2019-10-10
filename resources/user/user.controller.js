const Joi = require("@hapi/joi");
const User = require("./user.model");
const auth = require("../../config/auth");
exports.singIn = async (req, res) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .required()
      .trim(),
    password: Joi.string()
      .min(6)
      .max(30)
      .required()
  });
  try {
    Joi.validate(req.body, schema, (error, result) => {
      if (error) {
        const err = new Error(error.message);
        err.statusCode = 403;
        throw err;
      }
    });
    const user = await User.findOne({
      email: req.body.email
    })
      .select("email password")
      .exec();
    if (!user) {
      const err = new Error("Login or Password Not correct!");
      err.statusCode = 401;
      throw err;
    }
    const match = await user.checkPassword(req.body.password);

    if (!match) {
      const err = new Error("Error.. input not valid");
      err.statusCode = 401;
      throw err;
    }
    const token = auth.newToken(user);
    res.status(201).json({ token });
  } catch (err) {
    if (!err.statusCode) {
      console.log(err.message);
      res.status(500).end();
    } else {
      res.status(err.statusCode).json({ message: err.message });
    }
  }
};
exports.singUp = async (req, res) => {
  const schema = Joi.object().keys({
    fullname: Joi.string().required(),
    email: Joi.string()
      .required()
      .trim(),
    password: Joi.string()
      .min(6)
      .max(30)
      .required(),
    age: Joi.number()
      .min(14)
      .max(30)
      .required()
  });
  try {
    Joi.validate(req.body, schema, (error, result) => {
      if (error) {
        const err = new Error(error.message);
        err.statusCode = 403;
        throw err;
      }
    });
    const newUser = await User.create({ ...req.body });
    const token = auth.newToken(newUser);
    res.status(201).json({ data: newUser, token });
  } catch (err) {
    if (!err.statusCode) {
      console.log(err.message);
      res.status(500).end();
    } else {
      res.status(err.statusCode).json({ message: err.message });
    }
  }
};
