import React, { useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";

const API_URL = "https://sombloodgiver-8.onrender.com"; // Live backend

function Contact() {
  const [formData, setFormData] = useState({
    fullname: "",
    Email: "",
    Fariin: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/contact`, formData); // Live endpoint
      alert(
        "Thank you! We have received your message and will respond shortly."
      );
      setFormData({
        fullname: "",
        Email: "",
        Fariin: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <div className="pt-24 pb-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-red-600 mb-4">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          If you have any questions, suggestions, or would like to participate
          in our blood donation campaigns, please use the form below to reach
          out to us.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-red-600 mb-2">Email</h3>
              <p className="text-gray-700">info@blooddonation.so</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-red-600 mb-2">Phone</h3>
              <p className="text-gray-700">+252 61 2345678</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-red-600 mb-2">
                Working Hours
              </h3>
              <p className="text-gray-700">
                Sunday - Thursday: 8:00 AM – 5:00 PM
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-xl p-8 space-y-6"
          >
            <div>
              <label className="block text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-red-500"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-red-500"
                placeholder="Your email address"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Message</label>
              <textarea
                name="Fariin"
                value={formData.Fariin}
                onChange={handleChange}
                required
                placeholder="Write your message here..."
                className="w-full border border-gray-300 rounded px-4 py-2"
                rows={3}
              />
            </div>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Contact;
