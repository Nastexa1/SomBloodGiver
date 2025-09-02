import React from "react";
import { motion } from "framer-motion";
import img1 from "/img/img13.avif";
import img2 from "/img/img2.jpg";
import img3 from "/img/img3.avif";
import img4 from "/img/img4.avif";
import img5 from "/img/img5.avif";
import img6 from "/img/img6.avif";
import img7 from "/img/img7.avif";
import img8 from "/img/img8.avif";
import img9 from "/img/img9.avif";
import img10 from "/img/img10.avif";
import img11 from "/img/img11.avif";
import img12 from "/img/img1.avif";

const images = [
  { id: 1, src: img1, alt: "Blood donation 1" },
  { id: 2, src: img2, alt: "Blood donation 2" },
  { id: 3, src: img3, alt: "Blood donation 3" },
  { id: 4, src: img4, alt: "Blood donation 4" },
  { id: 5, src: img5, alt: "Blood donation 5" },
  { id: 6, src: img6, alt: "Blood donation 6" },
  { id: 7, src: img7, alt: "Blood donation 7" },
  { id: 8, src: img8, alt: "Blood donation 8" },
  { id: 9, src: img9, alt: "Blood donation 9" },
  { id: 10, src: img10, alt: "Blood donation 10" },
  { id: 11, src: img11, alt: "Blood donation 11" },
  { id: 12, src: img12, alt: "Blood donation 12" },
];

function DonateBloodGallery() {
  return <>
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 sm:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-red-600 dark:text-red-400 mb-10 mt-10">
        Donate Blood Gallery
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map(({ id, src, alt }, index) => (
          <motion.div
            key={id}
            className="overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-800"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <img
              src={src}
              alt={alt}
              className="w-full h-64 object-cover transform hover:scale-105 transition duration-300"
            />
          </motion.div>
        ))}
      </div>
    </div>
  
    </>
}

export default DonateBloodGallery;
