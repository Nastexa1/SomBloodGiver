import React, { useState } from "react";
import axios from "axios";

const Request = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    hospitalName: "",
    phone: "",
    blood: "",
    city: "",
    why: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/createRequest", formData);
      alert("Codsiga dhiigga waa la diray. Waxaan kuu rajaynaynaa caafimaad!");
      setFormData({
        patientName: "",
        hospitalName: "",
        phone: "",
        blood: "",
        city: "",
        why: "",
        date: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      alert("Waxaa dhacay khalad. Fadlan isku day mar kale.");
    }
  };

  return (
    <section className="pt-24 pb-16 px-4 md:px-10 bg-gradient-to-b from-white to-red-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-10 border border-red-100">
        <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
          Codso Dhiig – Badbaadi Nolosha
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Name */}
          <div>
            <label className="block mb-1 font-medium">Magaca Bukaanka</label>
            <input
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              required
              placeholder="e.g. Ayaan Maxamed"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-red-300"
            />
          </div>

          {/* Hospital Name */}
          <div>
            <label className="block mb-1 font-medium">Magaca Isbitaalka</label>
            <input
              name="hospitalName"
              value={formData.hospitalName}
              onChange={handleChange}
              required
              placeholder="e.g. Digfeer"
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block mb-1 font-medium">Lambarka Taleefanka</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="e.g. 0612345678"
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Blood Type */}
          <div>
            <label className="block mb-1 font-medium">Nooca Dhiigga</label>
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

          {/* City */}
          <div>
            <label className="block mb-1 font-medium">Magaalada</label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              placeholder="e.g. Muqdisho"
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block mb-1 font-medium">Sababta Dhiigga Loo Baahan Yahay</label>
            <textarea
              name="why"
              value={formData.why}
              onChange={handleChange}
              required
              placeholder="Tusaale: qalliinka degdegga ah, shil, iwm..."
              className="w-full border border-gray-300 rounded px-4 py-2"
              rows={3}
            />
          </div>

          {/* Needed Date */}
          <div>
            <label className="block mb-1 font-medium">Taariikhda Loo Baahan Yahay</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold shadow-sm transition-all duration-200"
          >
            Codso Dhiig
          </button>
        </form>
      </div>
    </section>
  );
};

export default Request;
