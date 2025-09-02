import {
  FaTachometerAlt,
  FaUser,
  FaTint,
  FaCog,
  FaSignOutAlt,
  FaEnvelope,
  FaChartBar
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const menuItems = [
    { label: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    { label: "Donors", icon: <FaUser />, path: "/donors" },
    { label: "Blood Requests", icon: <FaTint />, path: "/blood-requests" },
    { label: "Reports", icon: <FaChartBar />, path: "/report" },
    { label: "Contact Form", icon: <FaEnvelope />, path: "/contact-form" },
    { label: "Settings", icon: <FaCog />, path: "/settings" },
  ];

  return (
    <div className="w-64 h-screen bg-red-700 text-white flex flex-col justify-between shadow-lg fixed">
      {/* Top Logo / Title */}
      <div>
        <div className="p-6 text-2xl font-bold border-b border-red-600 mt-20">
          SomBGiver
        </div>

        {/* Navigation Menu */}
        <ul className="mt-4 space-y-1">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li
                key={index}
                onClick={() => navigate(item.path)}
                className={`p-4 flex items-center cursor-pointer transition-colors duration-200 ${
                  isActive ? "bg-red-600" : "hover:bg-red-600"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Logout Button */}
      <div
        onClick={handleLogout}
        className="p-4 hover:bg-red-600 cursor-pointer flex items-center border-t border-red-600"
      >
        <FaSignOutAlt className="mr-3" /> Logout
      </div>
    </div>
  );
};

export default Sidebar;
