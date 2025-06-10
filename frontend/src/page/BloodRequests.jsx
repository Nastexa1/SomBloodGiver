import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import Sidebar from "../components/Sidebar";

const BloodRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal & form state
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    hospitalName: "",
    phone: "",
    blood: "",
    city: "",
    why: "",
    date: "",
    _id: ""
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    setLoading(true);
    axios
      .get("http://localhost:3000/getRequests")
      .then((res) => {
        setRequests(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching requests:", err);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Ma hubtaa inaad tirtirayso codsigan?")) {
      axios
        .delete(`http://localhost:3000/removereq/${id}`)
        .then(() => {
          alert("Codsiga waa la tirtiray");
          setRequests((prev) => prev.filter((r) => r._id !== id));
        })
        .catch((error) => {
          console.error("Error deleting request:", error);
        });
    }
  };

  // Open modal & set form data for editing
  const handleEdit = (id) => {
    const selectedRequest = requests.find((r) => r._id === id);
    if (selectedRequest) {
      setFormData({ ...selectedRequest });
      setIsEditing(true);
    }
  };

  // Close modal without saving
  const handleCancel = () => {
    setIsEditing(false);
  };

  // Update form data on input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Send updated data to backend and update state
  const handleUpdate = () => {
    axios
      .put(`http://localhost:3000/updateRequest/${formData._id}`, formData)
      .then((res) => {
        alert("Codsiga waa la cusbooneysiiyay");
        setRequests((prev) =>
          prev.map((r) => (r._id === formData._id ? formData : r))
        );
        setIsEditing(false);
      })
      .catch((err) => {
        console.error("Error updating request:", err);
        alert("Waxaa dhacay khalad markaa la cusbooneysiinayay");
      });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 ml-60 mt-16">
        <h1 className="text-3xl font-bold text-red-900 mb-6 ">
          Liiska Codsiyada Dhiigga
        </h1>

        {loading ? (
          <div className="text-center mt-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-600 border-solid mx-auto"></div>
            <p className="mt-4 text-gray-600">Requests are loading...</p>
          </div>
        ) : requests.length === 0 ? (
          <p className="text-gray-600">Ma jiraan codsiyo dhiig oo la diiwaangeliyay.</p>
        ) : (
          <div className="overflow-x-auto shadow-md rounded-lg bg-white">
            <table className="min-w-full table-auto text-sm">
              <thead className="bg-red-700 text-white">
                <tr>
                  <th className="p-3 text-left">Magaca Bukaanka</th>
                  <th className="p-3 text-left">Isbitaalka</th>
                  <th className="p-3 text-left">Taleefan</th>
                  <th className="p-3 text-left">Nooca Dhiigga</th>
                  <th className="p-3 text-left">Magaalada</th>
                  <th className="p-3 text-left">Sababta</th>
                  <th className="p-3 text-left">Taariikhda</th>
                  <th className="p-3 text-center">Ficil</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {requests.map((req) => (
                  <tr key={req._id} className="border-b hover:bg-red-50">
                    <td className="p-3">{req.patientName}</td>
                    <td className="p-3">{req.hospitalName}</td>
                    <td className="p-3">{req.phone}</td>
                    <td className="p-3">{req.blood}</td>
                    <td className="p-3">{req.city}</td>
                    <td className="p-3">{req.why}</td>
                    <td className="p-3">{req.date}</td>
                    <td className="p-3 flex justify-center space-x-3">
                      <button
                        onClick={() => handleEdit(req._id)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(req._id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal for editing */}
        {isEditing && (
          <div className="fixed inset-0 bg-red-200 bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-red-700">Edit Codsiga</h2>

              <label className="block mb-2">
                Magaca Bukaanka:
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  className="w-full border p-2 rounded mt-1"
                />
              </label>

              <label className="block mb-2">
                Isbitaalka:
                <input
                  type="text"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleChange}
                  className="w-full border p-2 rounded mt-1"
                />
              </label>

              <label className="block mb-2">
                Taleefan:
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border p-2 rounded mt-1"
                />
              </label>

              <label className="block mb-2">
                Nooca Dhiigga:
                <input
                  type="text"
                  name="blood"
                  value={formData.blood}
                  onChange={handleChange}
                  className="w-full border p-2 rounded mt-1"
                />
              </label>

              <label className="block mb-2">
                Magaalada:
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border p-2 rounded mt-1"
                />
              </label>

              <label className="block mb-2">
                Sababta:
                <input
                  type="text"
                  name="why"
                  value={formData.why}
                  onChange={handleChange}
                  className="w-full border p-2 rounded mt-1"
                />
              </label>

              <label className="block mb-4">
                Taariikhda:
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border p-2 rounded mt-1"
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
      </div>
    </div>
  );
};

export default BloodRequests;
