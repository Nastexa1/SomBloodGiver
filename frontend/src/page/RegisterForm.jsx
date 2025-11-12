import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function RegisterForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ku xir live backend
      const res = await axios.post("https://sombloodgiver-5.onrender.com/register", {
        email: form.email,
        password: form.password,
      });

      setMessage(res.data.message);
      alert(res.data.message);
      setForm({ email: "", password: "" });

      // Navigate to login after 1.5 seconds
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.log("Full Error:", error);
      alert(
        error.response?.data?.message || "Registration failed, unknown error"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-white to-red-200 px-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border-t-8 border-red-600">
        <h2 className="text-3xl font-bold text-center text-red-700 mb-6">
          📝 Admin Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            Register
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-green-600">{message}</p>
        )}

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-red-600 font-semibold hover:underline hover:text-red-800"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
