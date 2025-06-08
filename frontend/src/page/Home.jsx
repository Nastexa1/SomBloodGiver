// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import About from "./About";
import Donate from "./Donate";
import ExploreDonation from "./ExploreDonation";
import SuccessStories from "./SuccessStories";
import Contact from "./Contact";
import Footer from "../components/Footer";

function Home() {
  return (
    <main className="">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl mt-30 font-bold text-red-600 mb-4 ">
          Donate Blood, Save Lives
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Your blood donation can give someone another chance at life. Be a hero today.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/donate"
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
          >
            Donate Now
          </Link>
          <Link
            to="/request"
            className="bg-white text-red-600 border border-red-600 px-6 py-2 rounded-md hover:bg-red-50"
          >
            Request Blood
          </Link>
        </div>
      </section>

      {/* Info Cards */}
      <section className="mt-16 grid gap-8 md:grid-cols-3 p-10">
        <div className="shadow-md p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Why Donate?</h2>
          <p className="text-gray-600">
            Blood donation helps people who are undergoing surgery, cancer treatment, or have suffered trauma.
          </p>
        </div>
        <div className="shadow-md p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Who Can Donate?</h2>
          <p className="text-gray-600">
            Most healthy individuals aged 18+ and weighing at least 50kg can donate blood every 3–4 months.
          </p>
        </div>
        <div className="shadow-md p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Become a Donor</h2>
          <p className="text-gray-600">
            Join our community of life-savers. Register today and we'll remind you when you're eligible to donate again.
          </p>
        </div>
      </section>
      <About/>
      <ExploreDonation/>
      <SuccessStories/>
      <Contact/>
        <Footer />
    </main>
    
  );
}

export default Home;
