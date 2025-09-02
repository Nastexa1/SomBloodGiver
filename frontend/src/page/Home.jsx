// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import image1 from "/img/Image_fx (36).jpg"; // sawirka turjumaya samatabbixin
import About from "./About";
import ExploreDonation from "./ExploreDonation";
import SuccessStories from "./SuccessStories";
import DonateBloodGallery from "./Gellery";
import Contact from "./Contact";
import Footer from "../components/Footer";

function Home() {
  return <>
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-20">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl w-full gap-12">
        
        {/* Left Side - Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-6">
            Welcome to SomB Giver
          </h1>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Your contribution can save lives. Som Giver is a platform that connects donors with people in urgent need — quickly, safely, and easily. 
            <br className="hidden md:block" />
            Be part of a life-saving mission. Every drop counts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/donate"
              className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition"
            >
              Donate Now
            </Link>
            <Link
              to="/request"
              className="bg-white text-red-600 border border-red-600 px-6 py-3 rounded-md hover:bg-red-100 transition"
            >
              Request Blood
            </Link>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="md:w-1/2">
          <img
            src={image1}
            alt="Donate Blood"
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>
      </section>
    </main>
    <About/>
    <ExploreDonation/>
    <SuccessStories/>
    <DonateBloodGallery/>
    <Contact/>
    <Footer/>
    
  </>
}

export default Home;
