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

// Connect MongoDB
mongoose.connect(MONGO_URL)
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
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) return res.status(404).json({ message: "Email not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

  res.json({ message: "Login successful", user });
});

// ----------------- DONATE -------------------
app.post("/create", async (req, res) => {
  const newData = new donateModel(req.body);
  const saveData = await newData.save();
  if (saveData) res.send("Data has been saved");
});

app.get("/get", async (req, res) => {
  const getdata = await donateModel.find();
  res.send(getdata);
});

// ----------------- MATCH DONORS -------------------
app.get("/match-donors", async (req, res) => {
  const { blood, city } = req.query;
  if (!blood || !city) return res.status(400).json({ message: "Blood and city required" });

  const donors = await donateModel.find({ blood, city });
  res.json(donors);
});

// ----------------- CONTACT -------------------
app.post("/contact", async (req, res) => {
  const newData = new contactModel(req.body);
  await newData.save();
  res.send("Contact saved successfully");
});

// ----------------- RUN SERVER -------------------
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
