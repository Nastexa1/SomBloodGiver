// ----------------- IMPORTS -------------------
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";

// MODELS
import donateModel from "./model/donateModel.js";
import requastModel from "./model/requastModel.js";
import contactModel from "./model/contactModel.js";
import userModel from "./model/userModel.js";

// ----------------- INIT APP -------------------
const app = express();
app.use(express.json());

// ----------------- CORS -------------------
// Allow frontend Netlify domain only
app.use(cors({
  origin: "https://sombloodgiver.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

// ----------------- DATABASE -------------------
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// ----------------- ADMIN AUTH -------------------

// Register Admin (1 time only)
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

// Admin Login
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

// Update Password
app.post("/update-password", async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating password", error: error.message });
  }
});

// ----------------- DONATE -------------------
app.post("/create", async (req, res) => {
  try {
    const newData = new donateModel(req.body);
    await newData.save();
    res.json({ message: "Data has been saved" });
  } catch (error) {
    res.status(500).json({ message: "Error saving data", error });
  }
});

app.get("/get", async (req, res) => {
  const getdata = await donateModel.find();
  res.json(getdata);
});

app.put("/update/:id", async (req, res) => {
  try {
    await donateModel.updateOne({ _id: req.params.id }, { $set: req.body });
    res.json({ message: "Data has been updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating data", error });
  }
});

app.delete("/removedonateModel/:id", async (req, res) => {
  try {
    await donateModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
});

// ----------------- REQUEST -------------------
app.post("/createRequest", async (req, res) => {
  try {
    const newData = new requastModel(req.body);
    await newData.save();
    res.json({ message: "Request saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving request", error });
  }
});

app.get("/getRequests", async (req, res) => {
  const getdata = await requastModel.find();
  res.json(getdata);
});

app.put("/updateRequest/:id", async (req, res) => {
  try {
    await requastModel.updateOne({ _id: req.params.id }, { $set: req.body });
    res.json({ message: "Request updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating request", error });
  }
});

app.delete("/removereq/:id", async (req, res) => {
  try {
    await requastModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
});

// ----------------- CONTACT -------------------
app.post("/contact", async (req, res) => {
  try {
    const newData = new contactModel(req.body);
    await newData.save();
    res.json({ message: "Contact saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving contact", error });
  }
});

app.get("/getContact", async (req, res) => {
  const getdata = await contactModel.find();
  res.json(getdata);
});

app.put("/put/:id", async (req, res) => {
  try {
    const updated = await contactModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating contact", error });
  }
});

app.delete("/removecontact/:id", async (req, res) => {
  try {
    await contactModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting message", error });
  }
});

// ----------------- MATCH DONORS -------------------
app.get("/match-donors", async (req, res) => {
  const { blood, city } = req.query;

  if (!blood || !city) return res.status(400).json({ message: "Blood and city required" });

  try {
    const donors = await donateModel.find({ blood, city });
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ----------------- CHART DATA -------------------
app.get("/chart-data", async (req, res) => {
  try {
    const donations = await donateModel.find();
    const countByMonth = {};

    donations.forEach((donation) => {
      const month = new Date(donation.date).toLocaleString("default", { month: "short" });
      countByMonth[month] = (countByMonth[month] || 0) + 1;
    });

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const chartData = months.map((month) => ({
      month,
      donations: countByMonth[month] || 0
    }));

    res.json(chartData);
  } catch (error) {
    res.status(500).json({ message: "Error generating chart data", error });
  }
});

// ----------------- RUN SERVER -------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
