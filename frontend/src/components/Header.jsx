// src/components/Header.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinkStyle = ({ isActive }) =>
    isActive ? "text-red-600 font-semibold" : "hover:text-red-500";

  return (
    <header className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="text-3xl font-bold">
          <span className="text-red-600">Blood</span>
          <span className="text-gray-700">Donner</span>
        </NavLink>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-red-600 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 text-black font-medium items-center">
          <NavLink to="/" className={navLinkStyle}>Home</NavLink>
          <NavLink to="/about" className={navLinkStyle}>About</NavLink>
          <NavLink to="/donate" className={navLinkStyle}>Donate</NavLink>
          <NavLink to="/request" className={navLinkStyle}>Request</NavLink>
          <NavLink to="/ExploreDonation" className={navLinkStyle}>Explore Donation</NavLink>
          <NavLink to="/SuccessStories" className={navLinkStyle}>Success Stories</NavLink>
          <NavLink to="/NewsPage" className={navLinkStyle}>News</NavLink>
          <NavLink to="/contact" className={navLinkStyle}>Contact</NavLink>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md w-full px-6 py-4">
          <ul className="flex flex-col gap-4 text-gray-800 font-medium">
            <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className={navLinkStyle}>Home</NavLink>
            <NavLink to="/about" onClick={() => setMobileMenuOpen(false)} className={navLinkStyle}>About</NavLink>
            <NavLink to="/donate" onClick={() => setMobileMenuOpen(false)} className={navLinkStyle}>Donate</NavLink>
            <NavLink to="/request" onClick={() => setMobileMenuOpen(false)} className={navLinkStyle}>Request</NavLink>
            <NavLink to="/ExploreDonation" onClick={() => setMobileMenuOpen(false)} className={navLinkStyle}>Explore Donation</NavLink>
            <NavLink to="/SuccessStories" onClick={() => setMobileMenuOpen(false)} className={navLinkStyle}>Success Stories</NavLink>
            <NavLink to="/NewsPage" onClick={() => setMobileMenuOpen(false)} className={navLinkStyle}>News</NavLink>
            <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)} className={navLinkStyle}>Contact</NavLink>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
