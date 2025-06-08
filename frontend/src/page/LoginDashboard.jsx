import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginDashboard({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "568983") {
      localStorage.setItem("token", "dummy_token");
      setIsAuthenticated(true);
      navigate("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 shadow-lg w-96 border-t-8 border-red-600 rounded-3xl"
      >
        <h2 className="text-3xl mb-6 font-bold text-center text-red-700">
          🔐 Admin Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginDashboard;
