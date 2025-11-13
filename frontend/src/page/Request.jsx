import React, { useEffect, useRef, useState } from "react";
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

  const [matchedDonors, setMatchedDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [noDonorsMessage, setNoDonorsMessage] = useState("");
  const matchedRef = useRef(null);

  const fetchMatchedDonors = async (blood, city) => {
    setLoading(true);
    setError("");
    setSuccessMessage("");
    setNoDonorsMessage("");

    try {
      const res = await axios.get("https://sombloodgiver-8.onrender.com/match-donors", {
        params: { blood, city },
      });
      const donors = res.data || [];
      setMatchedDonors(donors);

      if (donors.length > 0) {
        setSuccessMessage("Matching SomGivers found. Thank you for your request!");
      } else {
        setNoDonorsMessage("No matching SomGivers found yet. Please try again later.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while searching for SomGivers.");
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setNoDonorsMessage("");

    const { patientName, hospitalName, phone, blood, city, why, date } = formData;

    if (!patientName || !hospitalName || !phone || !blood || !city || !why || !date) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      // Live backend URL
      await axios.post("https://sombloodgiver-8.onrender.com/createRequest", formData);
      fetchMatchedDonors(blood, city);
      setFormData({
        patientName: "",
        hospitalName: "",
        phone: "",
        blood: "",
        city: "",
        why: "",
        date: "",
      });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    if (matchedDonors.length > 0 && matchedRef.current) {
      matchedRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [matchedDonors]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "patientName" && /\d/.test(value)) {
      setError("Patient name cannot contain numbers.");
      return;
    }

    if (name === "phone" && /[^0-9]/.test(value)) {
      return;
    }

    setError("");
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 mt-10 bg-gray-50 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 mb-6">
        <h2 className="text-3xl font-extrabold mb-6 text-red-600 text-center tracking-wide">
          Find a Blood
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Patient's Name</label>
            <input
              type="text"
              name="patientName"
              placeholder="Enter patient name"
              className="border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              value={formData.patientName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">Hospital</label>
            <input
              type="text"
              name="hospitalName"
              placeholder="Hospital name"
              className="border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              value={formData.hospitalName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Phone number"
              inputMode="numeric"
              pattern="[0-9]*"
              className="border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">Blood Type</label>
            <select
              name="blood"
              className="border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              value={formData.blood}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Blood Type --</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">City</label>
            <input
              type="text"
              name="city"
              placeholder="Enter city"
              className="border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">Reason for Request</label>
            <textarea
              name="why"
              placeholder="Explain why blood is needed"
              className="border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              rows={3}
              value={formData.why}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              className="border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {error && <p className="mt-4 text-center text-red-600 font-semibold">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`mt-8 w-full font-bold py-3 rounded-lg shadow-lg transition duration-300 ${
            loading
              ? "bg-red-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 text-white"
          }`}
        >
          {loading ? "Searching..." : "Search SomGivers"}
        </button>

        {successMessage && (
          <p className="mt-6 text-center text-green-600 font-semibold">{successMessage}</p>
        )}

        {noDonorsMessage && (
          <p className="mt-6 text-center text-yellow-600 font-semibold">{noDonorsMessage}</p>
        )}
      </form>

      <div ref={matchedRef}>
        {matchedDonors.length > 0 && (
          <>
            <h2 className="text-3xl font-extrabold mb-8 text-center text-red-600 tracking-wide">
              Matching SomGivers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {matchedDonors.map((donor) => (
                <div
                  key={donor._id}
                  className="border border-red-200 rounded-xl shadow-md bg-white p-6 hover:shadow-lg transition duration-300"
                >
                  <h3 className="text-xl font-bold text-red-600 mb-3">{donor.fullname}</h3>
                  <p className="mb-1">
                    <span className="font-semibold">Blood Type:</span>{" "}
                    <span className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                      {donor.blood}
                    </span>
                  </p>
                  <p className="mb-1">
                    <span className="font-semibold">City:</span> {donor.city}
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span> {donor.phone}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Request;
