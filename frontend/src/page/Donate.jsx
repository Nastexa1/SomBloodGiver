import React, { useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";

const Donate = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    blood: "",
    city: "",
    date: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent numbers in name
    if (name === "fullname" && /\d/.test(value)) {
      setError("Name must not contain numbers.");
      return;
    }

    // Prevent letters in phonepl
    if (name === "phone" && /[^0-9]/.test(value)) {
      return;
    }

    setError("");
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/create", formData);
      alert("Your information has been saved successfully.");
      setFormData({
        fullname: "",
        phone: "",
        blood: "",
        city: "",
        date: "",
      });
    } catch (error) {
      console.error("Error saving data", error);
      alert("An error occurred while saving your information.");
    }
  };

  return (
    <>
      <section className="pt-24 pb-16 px-4 md:px-10 bg-white min-h-screen">
        <div className="max-w-3xl mx-auto bg-gray-50 shadow-md rounded-md p-8">
          <h1 className="text-3xl font-bold text-red-600 mb-6 text-center">
            Become a SomGiver – Save Lives
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-red-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                pattern="[0-9]*"
                inputMode="numeric"
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-red-500"
                placeholder="e.g. 0612345678"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Blood Type</label>
              <select
                name="blood"
                value={formData.blood}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-4 py-2"
              >
                <option value="">-- Select --</option>
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
              <label className="block mb-1 font-medium text-gray-700">City/District</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-4 py-2"
                placeholder="Enter your city or district"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">When was your last donation?</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition w-full font-semibold"
            >
              Submit as a SomGiver
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Donate;
