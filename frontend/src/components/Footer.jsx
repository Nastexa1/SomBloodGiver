import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-red-600 text-white py-10">
      <div className="max-w-7xl px-4 grid md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-3">Ku Saabsan</h3>
          <p className="text-sm leading-relaxed">
            Waxaan u heellanahay badbaadinta nolosha dadka u baahan dhiig. Nala shaqee si aan u gaarsiino dhiig caafimaad leh kuwa u baahan.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-3">Bogagga Degdega</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/news" className="hover:underline">News</a></li>
            <li><a href="/donate" className="hover:underline">Donate</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-xl font-bold mb-3">La Xiriir</h3>
          <p className="text-sm">Km4, Muqdisho, Soomaaliya</p>
          <p className="text-sm">info@blooddonation.so</p>
          <div className="flex items-center gap-4 mt-4">
            <a href="#" className="text-white hover:text-gray-300"><FaFacebookF /></a>
            <a href="#" className="text-white hover:text-gray-300"><FaTwitter /></a>
            <a href="#" className="text-white hover:text-gray-300"><FaInstagram /></a>
            <a href="mailto:info@blooddonation.so" className="text-white hover:text-gray-300"><FaEnvelope /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-200 mt-10">
        © {new Date().getFullYear()} Blood Donation Somalia. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
