import { FaTachometerAlt, FaUser, FaTint, FaCog, FaSignOutAlt, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setIsAuthenticated(false);
    navigate("/login");
  };

  const menuItems = [
    { label: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    { label: "Donors", icon: <FaUser />, path: "/donors" },
    { label: "Blood Requests", icon: <FaTint />, path: "/blood-requests" },
    { label: "Contact Form", icon: <FaEnvelope />, path: "/contact-form" },
    { label: "Settings", icon: <FaCog />, path: "/settings" },
  ];

  return (
    <div className="w-64 h-screen bg-red-700 text-white flex flex-col justify-between shadow-xl fixed">
      <div>
        <div className="p-6 text-2xl font-bold border-b mt-20 border-red-600">
          BloodDonor
        </div>
        <ul className="mt-4 space-y-2">
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => navigate(item.path)}
              className="hover:bg-red-600 p-4 flex items-center cursor-pointer"
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      <div
        onClick={handleLogout}
        className="p-4 hover:bg-red-600 cursor-pointer flex items-center"
      >
        <FaSignOutAlt className="mr-3" /> Logout
      </div>
    </div>
  );
};

export default Sidebar;
