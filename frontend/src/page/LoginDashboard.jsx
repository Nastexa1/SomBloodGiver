import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_URL = "https://sombloodgiver-5.onrender.com"; // live backend

function LoginDashboard({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("admin", JSON.stringify(data.user));
        setIsAuthenticated(true);
        navigate("/dashboard");
      } else {
        setErrorMsg(data.message || "Invalid credentials");
      }
    } catch (error) {
      setErrorMsg("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-white to-red-200 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 shadow-2xl rounded-2xl w-full max-w-md border-t-8 border-red-600"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-red-700 flex items-center justify-center gap-2">
            <span className="animate-pulse">🔐</span> Admin Login
          </h2>
          <p className="text-gray-500 mt-1 text-sm">
            Welcome back! Please sign in
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 bg-red-100 text-red-700 p-3 rounded-lg text-sm">
            {errorMsg}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 transition-all duration-200 text-white p-3 rounded-lg font-semibold flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
          ) : null}
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-red-600 font-medium hover:underline hover:text-red-800 transition"
            >
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginDashboard;
