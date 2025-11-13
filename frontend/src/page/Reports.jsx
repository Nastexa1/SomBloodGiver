import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { NavLink } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const Reports = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        // Live backend URL
        const res = await axios.get("https://sombloodgiver-8.onrender.com/get");
        setDonors(res.data);
      } catch (err) {
        console.error("Failed to fetch donors");
      } finally {
        setLoading(false);
      }
    };
    fetchDonors();
  }, []);

  // Blood type statistics
  const bloodReport = donors.reduce((acc, donor) => {
    acc[donor.blood] = (acc[donor.blood] || 0) + 1;
    return acc;
  }, {});

  const cities = new Set(donors.map((d) => d.city));
  const totalDonors = donors.length;

  // Pie chart data
  const pieData = {
    labels: Object.keys(bloodReport),
    datasets: [
      {
        data: Object.values(bloodReport),
        backgroundColor: [
          "#f87171", "#60a5fa", "#facc15", "#34d399",
          "#a78bfa", "#f472b6", "#fdba74", "#4ade80"
        ],
        borderColor: "#fff",
        borderWidth: 1
      }
    ]
  };

  // CSV Download
  const generateCSV = () => {
    const csvHeader = "Full Name,Phone,Blood Type,City,Date\n";
    const csvRows = donors.map((d) =>
      `${d.fullname},${d.phone},${d.blood},${d.city},${d.date}`
    );
    const csvContent = csvHeader + csvRows.join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "blood_donor_report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 sm:p-10 ml-64 mt-20">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-red-600 text-center sm:text-left">
            📊 Blood Donor Reports
          </h1>
          <NavLink to="/requestReports">
            <button className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              ➕ Blood Request Reports
            </button>
          </NavLink>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading report...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              <div className="bg-white p-6 rounded shadow text-center">
                <p className="text-gray-500">Total Donors</p>
                <h2 className="text-3xl font-bold text-red-600">{totalDonors}</h2>
              </div>
              <div className="bg-white p-6 rounded shadow text-center">
                <p className="text-gray-500">Unique Blood Types</p>
                <h2 className="text-3xl font-bold text-blue-600">
                  {Object.keys(bloodReport).length}
                </h2>
              </div>
              <div className="bg-white p-6 rounded shadow text-center">
                <p className="text-gray-500">Cities Covered</p>
                <h2 className="text-3xl font-bold text-green-600">{cities.size}</h2>
              </div>
            </div>

            <div className="bg-white rounded shadow p-6 mb-10">
              <h2 className="text-xl font-semibold mb-4">
                Blood Type Distribution
              </h2>
              <div className="w-[300px] h-[300px] mx-auto">
                <Pie
                  data={pieData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { position: "bottom" }
                    }
                  }}
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded shadow mb-6 overflow-x-auto">
              <h2 className="text-xl font-semibold mb-4">Blood Type Summary Table</h2>
              <table className="w-full border text-sm table-auto">
                <thead className="bg-red-500">
                  <tr>
                    <th className="w-1/2 px-6 py-3 text-center font-medium text-white uppercase tracking-wider">
                      Blood Type
                    </th>
                    <th className="w-1/2 px-6 py-3 text-center font-medium text-white uppercase tracking-wider">
                      Donor Count
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(bloodReport).map(([type, count], index) => (
                    <tr key={type} className={index % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}>
                      <td className="w-1/2 px-6 py-3 text-center text-gray-800 font-semibold border border-red-700">{type}</td>
                      <td className="w-1/2 px-6 py-3 text-center text-gray-900 font-bold border border-red-700">{count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end">
              <button
                onClick={generateCSV}
                className="bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700 transition"
              >
                📥 Download CSV Report
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Reports;
