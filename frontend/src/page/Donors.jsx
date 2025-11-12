import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://sombloodgiver-5.onrender.com"; // Live backend

const Donors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await axios.get(`${API_URL}/get`);
        setDonors(res.data);
      } catch (err) {
        toast.error("Failed to fetch donors");
      } finally {
        setLoading(false);
      }
    };
    fetchDonors();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this donor?")) {
      try {
        await axios.delete(`${API_URL}/removedonateModel/${id}`);
        setDonors((prev) => prev.filter((donor) => donor._id !== id));
        toast.success("Donor deleted successfully");
      } catch {
        toast.error("Failed to delete donor");
      }
    }
  };

  const filteredDonors = donors.filter((donor) =>
    donor.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    donor.blood.toLowerCase().includes(searchQuery.toLowerCase()) ||
    donor.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 ml-64 mt-20">
        <ToastContainer />
        <h1 className="text-3xl font-bold text-red-600 mb-6 text-center">
          🩸 Blood Donors List (Table View)
        </h1>

        {/* Search */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <input
            type="text"
            placeholder="Search by name, blood type or city..."
            className="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-red-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Donors Table */}
        {loading ? (
          <p className="text-center text-gray-500">Please wait...</p>
        ) : filteredDonors.length === 0 ? (
          <p className="text-center text-red-500">No donors found.</p>
        ) : (
          <div className="overflow-x-auto rounded shadow">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="text-xs uppercase bg-red-600 text-white">
                <tr>
                  <th className="px-6 py-3">Full Name</th>
                  <th className="px-6 py-3">Phone</th>
                  <th className="px-6 py-3">Blood Type</th>
                  <th className="px-6 py-3">City</th>
                  <th className="px-6 py-3">Last Donation</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonors.map((donor) => (
                  <tr key={donor._id} className="bg-white border-b hover:bg-gray-100">
                    <td className="px-6 py-4 font-medium">{donor.fullname}</td>
                    <td className="px-6 py-4">{donor.phone}</td>
                    <td className="px-6 py-4">{donor.blood}</td>
                    <td className="px-6 py-4">{donor.city}</td>
                    <td className="px-6 py-4">{donor.date}</td>
                    <td className="px-6 py-4 flex justify-center gap-4">
                      <button
                        onClick={() => alert("Edit: " + donor._id)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(donor._id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default Donors;
