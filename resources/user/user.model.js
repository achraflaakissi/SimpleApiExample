const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const schemaUser = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);
schemaUser.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err);
    }

    this.password = hash;
    next();
  });
});
schemaUser.methods.checkPassword = function(password) {
  const passwordHash = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }

      resolve(same);
    });
  });
};

module.exports = mongoose.model("User", schemaUser);
