const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const app = express();

app.use(express.json());
app.use(cors());

// Connecting database
mongoose.connect("mongodb://localhost:27017/donner").then(() => {
  console.log("Database connected successfully");
}).catch((error) => {
  console.log(error);
});

// MODELS
const donateModel = require("./model/donateModel");
const requastModel = require("./model/requastModel");
const contactModel = require("./model/contactModel");
const userModel = require("./model/userModel");



// ----------------- ADMIN AUTH -------------------

// Register Admin (1 time only)
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

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
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) return res.status(404).json({ message: "Email not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

  res.json({ message: "Login successful", user });
});

// Update Password
app.post("/update-password", async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  try {
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
  const newData = new donateModel(req.body);
  const saveData = await newData.save();
  if (saveData) res.send("Data has been saved");
});

app.get("/get", async (req, res) => {
  const getdata = await donateModel.find();
  res.send(getdata);
});

app.put("/update/:id", async (req, res) => {
  const updateData = await donateModel.updateOne({ _id: req.params.id }, { $set: req.body });
  if (updateData) res.send("Data has been updated");
});

app.delete("/removedonateModel/:id", async (req, res) => {
  try {
    await donateModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
});


// ----------------- REQUAST -------------------
app.post("/createRequest", async (req, res) => {
  const newData = new requastModel(req.body);
  const saveData = await newData.save();
  if (saveData) res.send("Data has been saved");
});

app.get("/getRequests", async (req, res) => {
  const getdata = await requastModel.find();
  res.send(getdata);
});

app.put("/updateRequest/:id", async (req, res) => {
  const updateData = await requastModel.updateOne({ _id: req.params.id }, { $set: req.body });
  if (updateData) res.send("Data has been updated");
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
  const newData = new contactModel(req.body);
  const saveData = await newData.save();
  if (saveData) res.send("Contact saved successfully");
});

app.get("/getContact", async (req, res) => {
  const getdata = await contactModel.find();
  res.send(getdata);
});

app.put("/put/:id", async (req, res) => {
  try {
    const updated = await contactModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating contact", error });
  }
});

app.delete("/removecontact/:id", async (req, res) => {
  try {
    await contactModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting message", error });
  }
});

// ----------------- MATCH DONORS -------------------
app.get("/match-donors", async (req, res) => {
  const { blood, city } = req.query;

  if (!blood || !city) {
    return res.status(400).json({ message: "Blood and city required" });
  }

  try {
    const donors = await donateModel.find({ blood, city });
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ----------------- CHART DATA API -------------------
app.get("/chart-data", async (req, res) => {
  try {
    const donations = await donateModel.find();

    // Tirakoobka bisha
    const countByMonth = {};
    donations.forEach((donation) => {
      const month = new Date(donation.date).toLocaleString("default", { month: "short" }); // Ex: "Jan"
      countByMonth[month] = (countByMonth[month] || 0) + 1;
    });

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const chartData = months.map((month) => ({
      month,
      donations: countByMonth[month] || 0,
    }));

    res.json(chartData);
  } catch (error) {
    res.status(500).json({ message: "Error generating chart data", error });
  }
});


// ----------------- RUN SERVER -------------------
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
