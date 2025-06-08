import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Home from "./page/Home";
import About from "./page/About";
import Donate from "./page/Donate";
import Request from "./page/Request";
import Donors from "./page/Donors";
import ExploreDonation from "./page/ExploreDonation";
import SuccessStories from "./page/SuccessStories";
import NewsPage from "./page/NewsPage";
import Contact from "./page/Contact";
import Register from "./page/Register";
import DashboardHome from "./page/dashboard";
import Login from "./page/LoginDashboard";
import BloodRequests from "./page/BloodRequests";
import ContactMessages from "./page/ContactMessages";
import SettingsPage from "./page/SettingsPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/request" element={<Request />} />
        <Route path="/ExploreDonation" element={<ExploreDonation />} />
        <Route path="/SuccessStories" element={<SuccessStories />} />
        <Route path="/NewsPage" element={<NewsPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/Sidebar" element={<Sidebar />} />
        <Route path="/donors" element={<Donors />} />
        <Route path="/blood-requests" element={<BloodRequests />} />
        <Route path="/contact-form" element={<ContactMessages />} />
        <Route path="/settings" element={<SettingsPage />} />
        

        {/* Login Page */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />

        {/* Dashboard Protected Route */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <DashboardHome />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>

    
    </>
  );
}

export default App;
