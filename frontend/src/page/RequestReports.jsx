import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const RequestReports = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get("https://sombloodgiver-5.onrender.com/getRequests");
        setRequests(res.data);
      } catch (err) {
        console.error("Failed to fetch requests");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  // Blood type statistics
  const bloodStats = requests.reduce((acc, r) => {
    acc[r.blood] = (acc[r.blood] || 0) + 1;
    return acc;
  }, {});

  const cities = new Set(requests.map((r) => r.city));
  const totalRequests = requests.length;

  // Pie Chart Data
  const pieData = {
    labels: Object.keys(bloodStats),
    datasets: [
      {
        data: Object.values(bloodStats),
        backgroundColor: [
          "#f87171", "#60a5fa", "#facc15", "#34d399",
          "#a78bfa", "#f472b6", "#fdba74", "#4ade80"
        ],
        borderColor: "#fff",
        borderWidth: 1
      }
    ]
  };

  // CSV download
  const generateCSV = () => {
    const csvHeader = "Patient Name,Phone,Blood Type,Hospital,City,Reason,Date\n";
    const csvRows = requests.map((r) =>
      `${r.patientName},${r.phone},${r.blood},${r.hospitalName},${r.city},${r.why},${r.date}`
    );
    const csvContent = csvHeader + csvRows.join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "blood_requests_report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 ml-64 mt-20">
        <h1 className="text-3xl font-bold text-rose-700 mb-6 text-center">
          🧾 Blood Request Reports
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading report...</p>
        ) : (
          <>
            {/* Summary Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              <div className="bg-white p-6 rounded shadow text-center">
                <p className="text-gray-500">Total Requests</p>
                <h2 className="text-3xl font-bold text-rose-600">{totalRequests}</h2>
              </div>
              <div className="bg-white p-6 rounded shadow text-center">
                <p className="text-gray-500">Blood Types Needed</p>
                <h2 className="text-3xl font-bold text-blue-600">{Object.keys(bloodStats).length}</h2>
              </div>
              <div className="bg-white p-6 rounded shadow text-center">
                <p className="text-gray-500">Cities Requested From</p>
                <h2 className="text-3xl font-bold text-green-600">{cities.size}</h2>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-white rounded shadow p-6 mb-10">
              <h2 className="text-xl font-semibold mb-4">Blood Type Demand</h2>
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

            {/* Summary Table */}
            <div className="bg-white p-6 rounded shadow mb-6 overflow-x-auto">
              <h2 className="text-xl font-semibold mb-4">Blood Type Summary Table</h2>
              <table className="w-full border text-sm table-auto">
                <thead className="bg-red-500">
                  <tr>
                    <th className="w-1/2 px-6 py-3 text-center font-medium text-white uppercase tracking-wider">
                      Blood Type
                    </th>
                    <th className="w-1/2 px-6 py-3 text-center font-medium text-white uppercase tracking-wider">
                      Request Count
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(bloodStats).map(([type, count], index) => (
                    <tr
                      key={type}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}
                    >
                      <td className="w-1/2 px-6 py-3 text-center text-gray-800 font-semibold border border-red-700">
                        {type}
                      </td>
                      <td className="w-1/2 px-6 py-3 text-center text-gray-900 font-bold border border-red-700">
                        {count}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Download CSV */}
            <button
              onClick={generateCSV}
              className="bg-rose-600 text-white px-6 py-2 rounded hover:bg-rose-700 transition"
            >
              Download CSV Report
            </button>
          </>
        )}
      </main>
    </div>
  );
};

export default RequestReports;
