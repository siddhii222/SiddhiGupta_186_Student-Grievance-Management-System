const mongoose = require("mongoose");

const connectDB = async () => {
 await mongoose.connect(process.env.MONGO_URI, {
  dbName: "sgmsDB"
});
  console.log("MongoDB Connected");
};

module.exports = connectDB;