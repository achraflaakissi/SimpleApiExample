const Joi = require("@hapi/joi");
const User = require("./user.model");
const auth = require("../../config/auth");
exports.singIn = async (req, res) => {
  const vrf = await auth.verifyToken(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOWNiYjZhZGZkNmQ1NmZhNDE0NWU3MSIsImlhdCI6MTU3MDU1MjY4MiwiZXhwIjoxNTc5MTkyNjgyfQ.fg77UyrBtWnwCZa5pam8g98TrTFDL8LKBVBUcNCisus"
  );
  res.json({ data: vrf });
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
        const err = new Error("Error.. input not valid");
        err.statusCode = 403;
        err.data = { registerSuccess: false, error };
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
