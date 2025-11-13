import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import Sidebar from "../components/Sidebar";

function SettingsPage() {
  // Qaado admin info localStorage
  const admin = JSON.parse(localStorage.getItem("admin"));

  // Form state
  const [formData, setFormData] = useState({
    email: admin?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  // Dark mode state
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  // Apply dark mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate new password matches confirm password
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://sombloodgiver-8.onrender.com/update-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Password changed successfully!");
        setFormData({
          email: formData.email,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        alert(data.message || "Failed to update password");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center px-4 py-12 transition-colors duration-500">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-red-600 dark:text-gray-100">
              Update Password
            </h2>
            <button
              onClick={() => setIsDark(!isDark)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 transition
                ${isDark ? "bg-black text-white hover:bg-gray-800" : "bg-white text-black hover:bg-gray-200"}`}
              aria-label="Toggle dark mode"
            >
              {isDark ? <FaSun className="text-yellow-400" /> : <FaMoon />}
              {isDark ? "Light" : "Dark"}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email (disabled) */}
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />

            {/* Current Password */}
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              required
            />

            {/* New Password */}
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              required
            />

            {/* Confirm New Password */}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              required
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded transition disabled:opacity-70"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
