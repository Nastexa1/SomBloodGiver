import React, { useState } from "react";
import axios from "axios";

const Donate = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    blood: "",
    city: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/create", formData);
      alert("Data has been saved successfully");
      setFormData({
        fullname: "",
        phone: "",
        blood: "",
        city: "",
        date: "",
      });
    } catch (error) {
      console.error("Error saving data", error);
      alert("Error occurred while saving data");
    }
  };

  return (
    <section className="pt-24 pb-16 px-4 md:px-10 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto bg-gray-50 shadow-md rounded-md p-8">
        <h1 className="text-3xl font-bold text-red-600 mb-6 text-center">
          Dhiig Bixi – Badbaadi Naf
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Magaca Buuxa</label>
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
            <label className="block mb-1 font-medium text-gray-700">Lambarka Telefoonka</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-red-500"
              placeholder="e.g. 0612345678"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Nooca Dhiigga</label>
            <select
              name="blood"
              value={formData.blood}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option value="">-- Xulo --</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Degmada / Magaalada</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="Magaalada aad ku sugan tahay"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Goorma ayaad ugu dambeysay dhiig bixinta?</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition w-full font-semibold"
          >
            Dhiig Bixi Hadda
          </button>
        </form>
      </div>
    </section>
  );
};

export default Donate;
