const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/super-sweet-REACT-chat", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
