// src/pages/About.jsx
import React from "react";
import image1 from "/img/Image_fx (38).jpg"; // sawirka u muuqda in uu turjumayo samatabbixin/caawinaad

const About = () => {
  return (
    <section className="pt-24 pb-16 px-4 md:px-10 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Image */}
        <div className="relative group">
          <img
            src={image1}
            alt="Blood Donation"
            className="w-full h-auto rounded-xl shadow-lg group-hover:scale-105 transition duration-500 ease-in-out"
          />
          <div className="absolute bottom-4 right-4 bg-red-600 text-white text-sm px-4 py-1 rounded-full shadow-md">
            Save Lives ❤️
          </div>
        </div>

        {/* Text */}
        <div>
          <h1 className="text-4xl font-extrabold text-red-600 mb-4">SomB Giver</h1>

          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            <span className="font-semibold text-red-500">Som Giver</span> is a simple, fast, and reliable platform that connects blood donors with those in urgent need — turning generosity into action.
          </p>

          <ul className="list-disc ml-6 text-gray-700 space-y-2 mb-6 text-base">
            <li>Register as a donor in seconds.</li>
            <li>Find nearby recipients quickly.</li>
            <li>Direct and secure communication.</li>
          </ul>

          <div className="mt-6 p-6 bg-white shadow-lg rounded-xl border-l-4 border-red-500">
            <h2 className="text-xl font-bold text-red-600 mb-2">Our Mission</h2>
            <p className="text-gray-700">
              To create a caring community where every drop counts. We believe one donation can be the reason someone lives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
