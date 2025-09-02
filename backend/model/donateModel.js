const mongoose = require("mongoose");

const donateSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  blood: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false, // false = firfircoon, true = Recycle Bin
  },
});

module.exports = mongoose.model("donate", donateSchema);
