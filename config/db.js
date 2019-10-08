const mongoose = require("mongoose");

exports.getConnection = (url, options = {}) => {
  return mongoose.connect(url, {
    ...options,
    useUnifiedTopology: true
  });
};
