const jwt = require("jsonwebtoken");
require("dotenv/config");
exports.newToken = user => {
  console.log(process.env.SECRET_OR_KEY_JWT);
  return jwt.sign({ id: user.id }, process.env.SECRET_OR_KEY_JWT, {
    expiresIn: process.env.EXP_JWT
  });
};

exports.verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_OR_KEY_JWT, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });
