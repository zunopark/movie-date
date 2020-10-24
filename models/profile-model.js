const mongoose = require("mongoose");

const Profile = mongoose.model(
  "Profile",
  new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    image: String,
    name: String,
    number: String,
    myDesc: String,
    myType: String,
    whoAmI: String,
    movie: String,
    memory: String,
    sentence: String,
    gender: String,
  })
);

module.exports = Profile;
