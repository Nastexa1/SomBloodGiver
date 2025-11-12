import mongoose from "mongoose";

const donateSchema = new mongoose.Schema({
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
    default: false, // false = active, true = Recycle Bin
  },
});

const Donate = mongoose.model("Donate", donateSchema);

export default Donate;
