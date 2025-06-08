import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { FaEdit, FaTrash } from "react-icons/fa";

function Donors() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal & form state
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    fullname: "",
    blood: "",
    city: "",
    date: "",
  });

  // Fetch donors
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get");
        setDonors(response.data);
      } catch (error) {
        console.error("Error fetching donors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  // Delete handler
  const handleDelete = (id) => {
    if (window.confirm("Ma hubtaa inaad tirtirayso deeq bixiyahan?")) {
      axios
        .delete(`http://localhost:3000/remove/${id}`)
        .then(() => {
          setDonors((prev) => prev.filter((donor) => donor._id !== id));
        })
        .catch((err) => console.error("Delete error:", err));
    }
  };

  // Open edit modal and set form data
  const handleEdit = (id) => {
    const donorToEdit = donors.find((donor) => donor._id === id);
    if (donorToEdit) {
      setFormData({ ...donorToEdit });
      setIsEditing(true);
    }
  };

  // Close modal
  const handleCancel = () => {
    setIsEditing(false);
  };

  // Handle form input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Update donor info
  const handleUpdate = () => {
    axios
      .put(`http://localhost:3000/update/${formData._id}`, formData)
      .then(() => {
        alert("Deeq-bixiyaha waa la cusbooneysiiyay");
        setDonors((prev) =>
          prev.map((donor) => (donor._id === formData._id ? formData : donor))
        );
        setIsEditing(false);
      })
      .catch((err) => {
        console.error("Update error:", err);
        alert("Khalad ayaa dhacay markaa la cusbooneysiinayay.");
      });
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 ml-60 mt-10">
        <h2 className="text-3xl font-bold text-red-600 mb-8">
          🩸 Liiska Deeq-Bixiyeyaasha Dhiigga
        </h2>

        {loading ? (
          <p className="text-gray-600">Fadlan sug...</p>
        ) : donors.length === 0 ? (
          <p className="text-red-500 font-semibold">Ma jiraan deeq-bixiyeyaal.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Magaca</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Nooca Dhiigga</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Magaalada</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Taariikh</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold uppercase">Ficil</th>
                </tr>
              </thead>
              <tbody>
                {donors.map((donor, index) => (
                  <tr key={donor._id} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                    <td className="px-6 py-4 border-b">{donor.fullname}</td>
                    <td className="px-6 py-4 border-b">{donor.blood}</td>
                    <td className="px-6 py-4 border-b">{donor.city}</td>
                    <td className="px-6 py-4 border-b">{donor.date}</td>
                    <td className="px-6 py-4 border-b text-center">
                      <button
                        title="Tafatir"
                        className="text-green-600 hover:text-green-800 mr-4"
                        onClick={() => handleEdit(donor._id)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        title="Tirtir"
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(donor._id)}
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

        {/* Edit Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-red-200 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-red-600">Update This Form</h3>

              <label className="block mb-3">
                FullName:
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded px-3 py-2"
                />
              </label>

              <label className="block mb-3">
                bloodGroup:
                <input
                  type="text"
                  name="blood"
                  value={formData.blood}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded px-3 py-2"
                />
              </label>

              <label className="block mb-3">
                Town:
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded px-3 py-2"
                />
              </label>

              <label className="block mb-5">
                Date:
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded px-3 py-2"
                />
              </label>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Donors;
