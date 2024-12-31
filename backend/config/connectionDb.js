const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000 // Increase timeout
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Error connecting to MongoDB ", err));
};

module.exports = connectDb;
