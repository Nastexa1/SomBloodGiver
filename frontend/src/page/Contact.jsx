import React, { useState } from "react";
import axios from "axios";

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
      await axios.post("http://localhost:3000/contact", formData);
      alert("Ok tnx wan firin dona contactgaga");
      setFormData({
        fullname: "",
        Email: "",
        Fariin: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      alert("Waxaa dhacay khalad. Fadlan isku day mar kale.");
    }
  };

  return (
    <div className="pt-24 pb-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-red-600 mb-4">Nala Soo Xiriir</h2>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Haddii aad hayso su'aalo, tallooyin, ama aad rabto inaad nagala qaybqaadato ololeyaasha dhiig-bixinta, nala soo xiriir adigoo isticmaalaya foomka hoose.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-red-600 mb-2">Cinwaanka</h3>
            <p className="text-gray-700">Km4, Muqdisho, Soomaaliya</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-red-600 mb-2">Email</h3>
            <p className="text-gray-700">info@blooddonation.so</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-red-600 mb-2">Telefoon</h3>
            <p className="text-gray-700">+252 61 2345678</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-red-600 mb-2">Saacadaha Shaqada</h3>
            <p className="text-gray-700">Axad - Khamiis: 8:00 AM – 5:00 PM</p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 space-y-6">
          <div>
            <label className="block text-gray-700 mb-1">Magaca</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-red-500"
              placeholder="Magacaaga"
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
              placeholder="Emailkaaga"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Fariin</label>
            <textarea
              name="Fariin"
              value={formData.Fariin}
              onChange={handleChange}
              required
              placeholder="Tusaale: qalliinka degdegga ah, shil, iwm..."
              className="w-full border border-gray-300 rounded px-4 py-2"
              rows={3}
            />
          </div>
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg"
          >
            Dir Fariinta
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
