import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

function SettingsPage() {
  const [formData, setFormData] = useState({
    username: "Nastexa",
    email: "nastexa@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    language: "Somali",
  });

  const [darkMode, setDarkMode] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send formData and profileImage to backend
    alert("Settings saved successfully!");
  };

  return <>
  <Sidebar/>
    <div className={`max-w-4xl mr-50 mx-auto p-8 rounded-2xl shadow-lg transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <h2 className="text-4xl font-bold mb-8 text-center text-red-600 mt-10">User Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-2 font-medium">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">Profile Image</label>
          <input type="file" onChange={handleImageUpload} className="w-full" />
        </div>

        <div>
          <label className="block mb-2 font-medium">Language</label>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="Somali">Somali</option>
            <option value="English">English</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-medium">Dark Mode</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="toggle toggle-primary"
          />
        </div>

        <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <h3 className="text-xl font-semibold mb-3">Admin Settings</h3>
          <div>
            <label className="block mb-2 font-medium">User Role</label>
            <select className="w-full border rounded-lg px-4 py-2">
              <option>Admin</option>
              <option>User</option>
              <option>Moderator</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 justify-center mt-8">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Save Changes
          </button>
          <button type="button" className="bg-gray-300 px-6 py-2 rounded-lg hover:bg-gray-400">
            Cancel
          </button>
        </div>
      </form>
    </div>
    </>

}

export default SettingsPage;
