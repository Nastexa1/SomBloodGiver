import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { FaUser, FaEnvelope, FaCommentDots, FaEdit, FaTrash } from "react-icons/fa";

const API_URL = "https://sombloodgiver-8.onrender.com"; // Live backend

function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    fullname: "",
    Email: "",
    Fariin: "",
  });

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${API_URL}/getContact`);
      setMessages(res.data);
    } catch (error) {
      alert("Error fetching messages");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await axios.delete(`${API_URL}/removecontact/${id}`);
        fetchMessages();
      } catch (error) {
        alert("Error deleting message");
      }
    }
  };

  const handleEditClick = (msg) => {
    setEditingId(msg._id);
    setEditFormData({
      fullname: msg.fullname,
      Email: msg.Email,
      Fariin: msg.Fariin,
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/put/${editingId}`, editFormData);
      setEditingId(null);
      fetchMessages();
    } catch (error) {
      alert("Error updating message");
    }
  };

  const handleCancelEdit = () => setEditingId(null);

  return (
    <>
      <Sidebar />
      <div className="ml-64 pt-20 px-4 bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-rose-700 mb-6">
            📥 Contact Messages
          </h2>

          {messages.length === 0 ? (
            <p className="text-center text-gray-500">No messages found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className="bg-white shadow-md rounded-xl p-4 space-y-3 hover:shadow-lg transition-all"
                >
                  {editingId === msg._id ? (
                    <form onSubmit={handleEditSubmit} className="space-y-2">
                      <input
                        type="text"
                        name="fullname"
                        value={editFormData.fullname}
                        onChange={handleEditChange}
                        placeholder="Full Name"
                        className="w-full px-3 py-1.5 border rounded-md text-sm"
                      />
                      <input
                        type="email"
                        name="Email"
                        value={editFormData.Email}
                        onChange={handleEditChange}
                        placeholder="Email"
                        className="w-full px-3 py-1.5 border rounded-md text-sm"
                      />
                      <textarea
                        name="Fariin"
                        value={editFormData.Fariin}
                        onChange={handleEditChange}
                        rows="2"
                        placeholder="Message"
                        className="w-full px-3 py-1.5 border rounded-md text-sm"
                      ></textarea>
                      <div className="flex justify-between pt-2">
                        <button
                          type="submit"
                          className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                        >
                          ✅ Save
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="bg-gray-300 px-3 py-1 rounded text-xs hover:bg-gray-400"
                        >
                          ❌ Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <p className="text-gray-800 font-semibold flex items-center gap-2 text-sm">
                        <FaUser className="text-rose-600 text-sm" /> {msg.fullname}
                      </p>
                      <p className="text-gray-600 flex items-center gap-2 text-sm">
                        <FaEnvelope className="text-blue-500 text-sm" /> {msg.Email}
                      </p>
                      <p className="text-gray-600 flex items-start gap-2 text-sm">
                        <FaCommentDots className="text-green-500 mt-1 text-sm" /> {msg.Fariin}
                      </p>

                      <div className="flex justify-end gap-2 pt-3 border-t pt-2">
                        <button
                          onClick={() => handleEditClick(msg)}
                          title="Edit"
                          className="text-white bg-green-500 hover:bg-yellow-600 px-2 py-1 rounded text-xs flex items-center gap-1"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(msg._id)}
                          title="Delete"
                          className="text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs flex items-center gap-1"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ContactMessages;
