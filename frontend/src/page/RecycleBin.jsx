import React, { useEffect, useState } from "react";
import axios from "axios";

function RecycleBin() {
  const [deletedDonors, setDeletedDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeletedDonors = async () => {
      try {
        const res = await axios.get("http://localhost:3000/recycle-donors");
        setDeletedDonors(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recycle bin data:", error);
        setLoading(false);
      }
    };

    fetchDeletedDonors();
  }, []);

  return (
    <section className="min-h-screen pt-24 pb-10 px-4 md:px-12 bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-8">
          🗑️ Recycle Bin – Deleted Donors
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : deletedDonors.length === 0 ? (
          <p className="text-center text-gray-600">No deleted donors found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {deletedDonors.map((donor) => (
              <div
                key={donor._id}
                className="border border-red-300 rounded-lg bg-red-50 p-5 shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold text-red-700">{donor.fullname}</h3>
                <p><strong>Phone:</strong> {donor.phone}</p>
                <p><strong>Blood Type:</strong> {donor.blood}</p>
                <p><strong>City:</strong> {donor.city}</p>
                <p><strong>Date:</strong> {donor.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default RecycleBin;
