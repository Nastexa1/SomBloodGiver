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
import Contact from "./page/Contact";
import DashboardHome from "./page/dashboard";
import Login from "./page/LoginDashboard";
import BloodRequests from "./page/BloodRequests";
import ContactMessages from "./page/ContactMessages";
import SettingsPage from "./page/SettingsPage";
import DonateBloodGallery from "./page/Gellery";
import Reports from "./page/Reports";
import RequestReports from "./page/RequestReports";
import RegisterForm from "./page/RegisterForm";

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
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/Sidebar" element={<Sidebar />} />
        <Route path="/donors" element={<Donors />} />
        <Route path="/blood-requests" element={<BloodRequests />} />
        <Route path="/contact-form" element={<ContactMessages />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/DonateBloodGallery" element={<DonateBloodGallery />} />
        

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
          <Route path="/report" element={<Reports />} />
          <Route path="/requestReports" element={<RequestReports />} />

      </Routes>
      


    
    </>
  );
}

export default App;
