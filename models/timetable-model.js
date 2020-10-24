const mongoose = require("mongoose");

const Timetable = mongoose.model(
  "Timetable",
  new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first: { type: String, default: null },
    second: { type: String, default: null },
    third: { type: String, default: null },
  })
);

module.exports = Timetable;
