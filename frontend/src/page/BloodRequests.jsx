import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaTrash, FaEdit, FaTint, FaHospital, FaPhone, FaCity,
  FaRegCalendarAlt, FaUserMd, FaRegStickyNote
} from "react-icons/fa";
import Sidebar from "../components/Sidebar";

const API_URL = "https://sombloodgiver-8.onrender.com"; // Live backend URL

const BloodRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    patientName: "",
    hospitalName: "",
    phone: "",
    blood: "",
    city: "",
    why: "",
    date: "",
    _id: "",
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    setLoading(true);
    axios
      .get(`${API_URL}/getRequests`)
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
    if (window.confirm("Are you sure you want to delete this request?")) {
      axios.delete(`${API_URL}/removereq/${id}`).then(() => {
        alert("Request deleted successfully");
        setRequests((prev) => prev.filter((r) => r._id !== id));
      });
    }
  };

  const handleEdit = (id) => {
    const selectedRequest = requests.find((r) => r._id === id);
    if (selectedRequest) {
      setFormData({ ...selectedRequest });
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      patientName: "",
      hospitalName: "",
      phone: "",
      blood: "",
      city: "",
      why: "",
      date: "",
      _id: "",
    });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = () => {
    axios.put(`${API_URL}/updateRequest/${formData._id}`, formData).then(() => {
      alert("Request updated successfully");
      setRequests((prev) =>
        prev.map((r) => (r._id === formData._id ? formData : r))
      );
      handleCancel();
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 ml-60 mt-16">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-rose-700">SomBloodGiver</h1>
            <p className="text-slate-600">All recorded blood requests</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center mt-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-rose-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading requests...</p>
          </div>
        ) : requests.length === 0 ? (
          <p className="text-gray-600 mt-10">No blood requests found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((req) => (
              <div
                key={req._id}
                className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition border border-gray-200"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <FaUserMd className="text-rose-600" /> {req.patientName}
                </h2>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li className="flex items-center gap-2">
                    <FaHospital className="text-gray-500" /> 
                    <span><strong>Hospital:</strong> {req.hospitalName}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaPhone className="text-gray-500" /> 
                    <span><strong>Phone:</strong> {req.phone}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaTint className="text-red-600" /> 
                    <span><strong>Blood Type:</strong> {req.blood}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCity className="text-gray-500" /> 
                    <span><strong>City:</strong> {req.city}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaRegStickyNote className="text-gray-500" /> 
                    <span><strong>Reason:</strong> {req.why}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaRegCalendarAlt className="text-gray-500" /> 
                    <span><strong>Date:</strong> {req.date}</span>
                  </li>
                </ul>

                <div className="flex justify-end gap-4 mt-4 border-t pt-3">
                  <button
                    onClick={() => handleEdit(req._id)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Edit */}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 px-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl space-y-4">
              <h2 className="text-2xl font-bold text-center text-rose-700">Edit Blood Request</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" name="patientName" placeholder="Patient Name" value={formData.patientName} onChange={handleChange} className="border rounded p-2" />
                <input type="text" name="hospitalName" placeholder="Hospital" value={formData.hospitalName} onChange={handleChange} className="border rounded p-2" />
                <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="border rounded p-2" />
                <input type="text" name="blood" placeholder="Blood Type" value={formData.blood} onChange={handleChange} className="border rounded p-2" />
                <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="border rounded p-2" />
                <input type="text" name="why" placeholder="Reason" value={formData.why} onChange={handleChange} className="border rounded p-2" />
                <input type="date" name="date" value={formData.date} onChange={handleChange} className="border rounded p-2 col-span-full" />
              </div>
              <div className="flex justify-end gap-4 pt-4 border-t">
                <button onClick={handleCancel} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800">Cancel</button>
                <button onClick={handleUpdate} className="px-4 py-2 rounded bg-rose-600 text-white hover:bg-rose-700">Update</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BloodRequests;
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaTrash, FaEdit, FaTint, FaHospital, FaPhone, FaCity,
  FaRegCalendarAlt, FaUserMd, FaRegStickyNote
} from "react-icons/fa";
import Sidebar from "../components/Sidebar";

const API_URL = "https://sombloodgiver-5.onrender.com"; // Live backend URL

const BloodRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    patientName: "",
    hospitalName: "",
    phone: "",
    blood: "",
    city: "",
    why: "",
    date: "",
    _id: "",
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    setLoading(true);
    axios
      .get(`${API_URL}/getRequests`)
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
    if (window.confirm("Are you sure you want to delete this request?")) {
      axios.delete(`${API_URL}/removereq/${id}`).then(() => {
        alert("Request deleted successfully");
        setRequests((prev) => prev.filter((r) => r._id !== id));
      });
    }
  };

  const handleEdit = (id) => {
    const selectedRequest = requests.find((r) => r._id === id);
    if (selectedRequest) {
      setFormData({ ...selectedRequest });
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      patientName: "",
      hospitalName: "",
      phone: "",
      blood: "",
      city: "",
      why: "",
      date: "",
      _id: "",
    });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = () => {
    axios.put(`${API_URL}/updateRequest/${formData._id}`, formData).then(() => {
      alert("Request updated successfully");
      setRequests((prev) =>
        prev.map((r) => (r._id === formData._id ? formData : r))
      );
      handleCancel();
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 ml-60 mt-16">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-rose-700">SomBloodGiver</h1>
            <p className="text-slate-600">All recorded blood requests</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center mt-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-rose-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading requests...</p>
          </div>
        ) : requests.length === 0 ? (
          <p className="text-gray-600 mt-10">No blood requests found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((req) => (
              <div
                key={req._id}
                className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition border border-gray-200"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <FaUserMd className="text-rose-600" /> {req.patientName}
                </h2>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li className="flex items-center gap-2">
                    <FaHospital className="text-gray-500" /> 
                    <span><strong>Hospital:</strong> {req.hospitalName}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaPhone className="text-gray-500" /> 
                    <span><strong>Phone:</strong> {req.phone}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaTint className="text-red-600" /> 
                    <span><strong>Blood Type:</strong> {req.blood}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCity className="text-gray-500" /> 
                    <span><strong>City:</strong> {req.city}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaRegStickyNote className="text-gray-500" /> 
                    <span><strong>Reason:</strong> {req.why}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaRegCalendarAlt className="text-gray-500" /> 
                    <span><strong>Date:</strong> {req.date}</span>
                  </li>
                </ul>

                <div className="flex justify-end gap-4 mt-4 border-t pt-3">
                  <button
                    onClick={() => handleEdit(req._id)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Edit */}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 px-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl space-y-4">
              <h2 className="text-2xl font-bold text-center text-rose-700">Edit Blood Request</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" name="patientName" placeholder="Patient Name" value={formData.patientName} onChange={handleChange} className="border rounded p-2" />
                <input type="text" name="hospitalName" placeholder="Hospital" value={formData.hospitalName} onChange={handleChange} className="border rounded p-2" />
                <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="border rounded p-2" />
                <input type="text" name="blood" placeholder="Blood Type" value={formData.blood} onChange={handleChange} className="border rounded p-2" />
                <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="border rounded p-2" />
                <input type="text" name="why" placeholder="Reason" value={formData.why} onChange={handleChange} className="border rounded p-2" />
                <input type="date" name="date" value={formData.date} onChange={handleChange} className="border rounded p-2 col-span-full" />
              </div>
              <div className="flex justify-end gap-4 pt-4 border-t">
                <button onClick={handleCancel} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800">Cancel</button>
                <button onClick={handleUpdate} className="px-4 py-2 rounded bg-rose-600 text-white hover:bg-rose-700">Update</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BloodRequests;
