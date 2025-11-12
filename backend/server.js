import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";

import donateModel from "./model/donateModel.js";
import requastModel from "./model/requastModel.js";
import contactModel from "./model/contactModel.js";
import userModel from "./model/userModel.js";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

// ----------------- CONNECT MONGODB -------------------
if (!MONGO_URL) {
  console.error("Error: MONGO_URL environment variable not set");
  process.exit(1);
}

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.log("MongoDB connection error:", err));

// ----------------- ADMIN AUTH -------------------
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new userModel({ email, password: hashed });
    await user.save();

    res.json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Register error", error: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Login error", error: error.message });
  }
});

// ----------------- DONATE -------------------
app.post("/create", async (req, res) => {
  try {
    const newData = new donateModel(req.body);
    await newData.save();
    res.json({ message: "Data has been saved" });
  } catch (error) {
    res.status(500).json({ message: "Error saving data", error: error.message });
  }
});

app.get("/get", async (req, res) => {
  try {
    const getdata = await donateModel.find();
    res.json(getdata);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error: error.message });
  }
});

// ----------------- MATCH DONORS -------------------
app.get("/match-donors", async (req, res) => {
  try {
    const { blood, city } = req.query;
    if (!blood || !city) return res.status(400).json({ message: "Blood and city required" });

    const donors = await donateModel.find({ blood, city });
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donors", error: error.message });
  }
});

// ----------------- CONTACT -------------------
app.post("/contact", async (req, res) => {
  try {
    const newData = new contactModel(req.body);
    await newData.save();
    res.json({ message: "Contact saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving contact", error: error.message });
  }
});

// ----------------- RUN SERVER -------------------
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
