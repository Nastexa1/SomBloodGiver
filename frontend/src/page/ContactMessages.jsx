import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    fullname: "",
    Email: "",
    Fariin: "",
  });

  // Fetch all messages from backend
 // kaliya beddel line-ka fetchMessages
const fetchMessages = async () => {
  try {
    const res = await axios.get("http://localhost:3000/getContact"); // sax
    setMessages(res.data);
  } catch (error) {
    alert("Error fetching messages");
    console.error(error);
  }
};


  useEffect(() => {
    fetchMessages();
  }, []);

  // Delete a message by id
  const handleDelete = async (id) => {
    if (window.confirm("Ma hubtaa inaad tirtirayso fariintan?")) {
      try {
        await axios.delete(`http://localhost:3000/removecontact/${id}`);
        fetchMessages(); // Refresh list
      } catch (error) {
        alert("Khalad ayaa dhacay inta la tirtirayay");
        console.error(error);
      }
    }
  };

  // Start editing a message
  const handleEditClick = (message) => {
    setEditingId(message._id);
    setEditFormData({
      fullname: message.fullname,
      Email: message.Email,
      Fariin: message.Fariin,
    });
  };

  // Handle form input changes during editing
  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  // Submit updated message to backend
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/put/${editingId}`, editFormData);
      setEditingId(null);
      fetchMessages();
    } catch (error) {
      alert("Khalad ayaa dhacay inta la cusboonaysiinayay");
      console.error(error);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);
  };

  return <>
  <Sidebar/>

    <div className="max-w-4xl mx-auto p-4 ml-60">
      <h2 className="text-3xl font-bold text-red-600 mb-6 text-center mt-20">Fariimaha Contact</h2>

      {messages.length === 0 ? (
        <p className="text-center text-gray-600">Fariin lama helin</p>
      ) : (
        <ul className="space-y-4">
          {messages.map((msg) => (
            <li key={msg._id} className=" p-4 rounded shadow-inner bg-red-30">
              {editingId === msg._id ? (
                <form onSubmit={handleEditSubmit} className="space-y-3">
                  <input
                    type="text"
                    name="fullname"
                    value={editFormData.fullname}
                    onChange={handleEditChange}
                    className="w-full border rounded px-3 py-2"
                    required
                    placeholder="Magaca"
                  />
                  <input
                    type="email"
                    name="Email"
                    value={editFormData.Email}
                    onChange={handleEditChange}
                    className="w-full border rounded px-3 py-2"
                    required
                    placeholder="Email"
                  />
                  <textarea
                    name="Fariin"
                    value={editFormData.Fariin}
                    onChange={handleEditChange}
                    className="w-full border rounded px-3 py-2"
                    rows={3}
                    required
                    placeholder="Fariin"
                  />
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Kaydi
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                    >
                      Jooji
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <p><strong>Magaca:</strong> {msg.fullname}</p>
                  <p><strong>Email:</strong> {msg.Email}</p>
                  <p><strong>Fariin:</strong> {msg.Fariin}</p>
                  <div className="mt-3 flex gap-3">
                    <button
                      onClick={() => handleEditClick(msg)}
                      className="bg-green-400 px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(msg._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
      </>
}

export default ContactMessages;
