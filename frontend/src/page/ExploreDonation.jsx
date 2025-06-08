// src/pages/ExploreDonation.jsx
import React from "react";
import { Link } from "react-router-dom";

function ExploreDonation() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-red-600 mb-4 mt-20">Explore Blood Donation</h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Learn more about how your blood donation can save lives, how the process works, and how you can become a regular donor.
          </p>
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold text-red-500 mb-2">Why Donate?</h2>
            <p className="text-gray-600">
              Every blood donation can help save up to three lives. Blood is essential for surgeries, cancer treatment, chronic illnesses, and traumatic injuries.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold text-red-500 mb-2">Donation Process</h2>
            <p className="text-gray-600">
              The process takes about 30-45 minutes. It includes registration, a mini health screening, the donation itself, and post-donation refreshments.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold text-red-500 mb-2">Who Can Donate?</h2>
            <p className="text-gray-600">
              Most healthy adults can donate blood. Basic requirements include being at least 18 years old, weighing 50kg or more, and being in good health.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold text-red-500 mb-2">How Often?</h2>
            <p className="text-gray-600">
              Whole blood donation can be done every 56 days. Platelet donation is possible every 7 days, up to 24 times a year.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold text-red-500 mb-2">Become a Hero</h2>
            <p className="text-gray-600">
              Your one act of kindness can create a ripple of hope. Register today and become a life-saving hero in your community.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold text-red-500 mb-2">Host a Blood Drive</h2>
            <p className="text-gray-600">
              Organize a blood drive at your school, workplace, or mosque. It’s a powerful way to give back and make a difference.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Save Lives?</h2>
          <Link
            to="/register"
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition"
          >
            Register as a Donor
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ExploreDonation;
