import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Fariin: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
