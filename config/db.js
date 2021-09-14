const mongoose = require("mongoose");
const config = require("config");
const MONGODB_URL = config.get("MONGODB_URL");

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL);

    console.log(mongoose.connection.readyState, "mongoDB connected");
  } catch (error) {
    console.error(error.message);
    // exit process with failure.
    process.exit(1);
  }
};

module.exports = connectDB;
