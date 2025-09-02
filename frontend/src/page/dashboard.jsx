import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import axios from "axios";
import { FaUser, FaEnvelope, FaHandHoldingMedical } from "react-icons/fa";

const Dashboard = () => {
  const [donors, setDonors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [messages, setMessages] = useState([]);

  // Chart data summary
  const chartData = [
    { name: "Donors", value: donors.length },
    { name: "Requests", value: requests.length },
    { name: "Messages", value: messages.length },
  ];

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/get");
        setDonors(data);
      } catch (error) {
        console.error("Error fetching donors:", error);
      }
    };

    const fetchRequests = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/getRequests");
        setRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    const fetchMessages = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/getContact");
        setMessages(data);
      } catch (error) {
        console.error("Error fetching contact messages:", error);
      }
    };

    fetchDonors();
    fetchRequests();
    fetchMessages();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <main className="ml-64 p-6 w-full min-h-screen bg-gradient-to-br from-gray-100 to-red-50">
        <h2 className="text-3xl font-bold text-red-600 mb-8 mt-20 text-center">
          Admin Dashboard Overview
        </h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10 max-w-5xl mx-auto">
          {[
            {
              title: "Total Donors",
              count: donors.length,
              icon: <FaUser className="text-red-600 text-3xl mt-5" />,
              border: "border-red-500",
              color: "text-red-600",
            },
            {
              title: "Total Blood Requests",
              count: requests.length,
              icon: <FaHandHoldingMedical className="text-green-600 text-3xl mt-5" />,
              border: "border-green-500",
              color: "text-yellow-600",
            },
            {
              title: "Contact Messages",
              count: messages.length,
              icon: <FaEnvelope className="text-blue-600 text-3xl mt-5" />,
              border: "border-blue-500",
              color: "text-blue-600",
            },
          ].map(({ title, count, icon, border, color }) => (
            <div
              key={title}
              className={`bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex justify-between items-center border-t-4 ${border}`}
            >
              <div>
                <h3 className="text-md font-semibold text-gray-600">{title}</h3>
                <p className={`text-3xl font-bold mt-1 ${color}`}>{count}</p>
              </div>
              <div>{icon}</div>
            </div>
          ))}
        </div>

       {/* Bar Chart */}
<section className="bg-gradient-to-br from-white to-red-50 rounded-2xl shadow-xl mx-auto  border border-red-200 max-w-5xl">
  <h3 className="text-2xl font-bold text-red-700 mb-6 text-center tracking-wide uppercase">
   SomB Giver Statistics
  </h3>

  <ResponsiveContainer width="100%" height={250}>
    <BarChart
      data={chartData}
      margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
    >
      <CartesianGrid strokeDasharray="4 4" stroke="#fecaca" />
      <XAxis dataKey="name" stroke="#b91c1c" tick={{ fontSize: 14 }} />
      <YAxis stroke="#b91c1c" tick={{ fontSize: 14 }} />
      <Tooltip
        contentStyle={{
          backgroundColor: "#fef2f2",
          borderColor: "#fecaca",
          borderRadius: "10px",
          fontSize: "14px",
        }}
        itemStyle={{ color: "#b91c1c", fontWeight: "bold" }}
        cursor={{ fill: "#fee2e2" }}
      />
      <Bar
        dataKey="value"
        fill="#dc2626"
        radius={[10, 10, 0, 0]}
        barSize={45}
        label={{
          position: "top",
          fill: "#991b1b",
          fontSize: 13,
          fontWeight: 600,
        }}
      />
    </BarChart>
  </ResponsiveContainer>
</section>

      </main>
    </div>
  );
};

export default Dashboard;
