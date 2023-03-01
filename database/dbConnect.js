const mongoose = require("mongoose");
require("dotenv").config();

const ConnectDB = () => {
  return mongoose
    .connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to the mongodb database");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = ConnectDB;
