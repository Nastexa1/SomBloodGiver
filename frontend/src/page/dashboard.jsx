import Sidebar from "../components/Sidebar";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// Mock Data
const donationData = [
  { month: "Jan", donations: 10 },
  { month: "Feb", donations: 25 },
  { month: "Mar", donations: 18 },
  { month: "Apr", donations: 30 },
  { month: "May", donations: 22 },
  { month: "Jun", donations: 27 },
];
const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

const dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 p-6 w-full min-h-screen bg-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 mt-20">Overview</h2>

        {/* Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-600">Total Donors</h3>
            <p className="text-4xl font-bold text-red-600 mt-2">120</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-600">Blood Requests</h3>
            <p className="text-4xl font-bold text-red-600 mt-2">35</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-600">Pending Approvals</h3>
            <p className="text-4xl font-bold text-red-600 mt-2">8</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-600">Active Users</h3>
            <p className="text-4xl font-bold text-red-600 mt-2">50</p>
          </div>
        </div>

        {/* Graph Section */}
       <div className="bg-white p-4 rounded-lg shadow">
  <h3 className="text-lg font-semibold text-gray-700 mb-3">Monthly Donations</h3>
  <ResponsiveContainer width="100%" height={220}>
    <BarChart data={donationData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
      <XAxis dataKey="month" fontSize={12} stroke="#6b7280" />
      <YAxis fontSize={12} stroke="#6b7280" />
      <Tooltip 
        contentStyle={{ backgroundColor: "#fef2f2", borderColor: "#fecaca" }}
        itemStyle={{ color: "#b91c1c", fontSize: 12 }}
      />
      <Bar
        dataKey="donations"
        fill="#dc2626"
        radius={[6, 6, 0, 0]}
        barSize={30}
        label={{ position: 'top', fill: '#991b1b', fontSize: 10 }}
      />
    </BarChart>
  </ResponsiveContainer>
</div>

      </div>
    </div>
  );
};

export default dashboard;
