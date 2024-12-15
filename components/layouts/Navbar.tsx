"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Controls menu visibility
  const navItems = ["About", "Skills", "Projects", "Contact"];

  // Handle navigation and smooth scrolling
  const handleNavClick = (e: React.MouseEvent, section: string) => {
    e.preventDefault(); // Prevent default link behavior
    setIsOpen(false); // Close the menu

    if (window.location.pathname === "/") {
      // Smooth scroll if already on the landing page
      const target = document.getElementById(section.toLowerCase());
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to the landing page with the hash
      window.location.href = `/#${section.toLowerCase()}`;
    }
  };

  return (
    <nav className="flex items-center justify-between w-full container p-6 relative">
      {/* Brand Logo */}
      <Link href="/">
        <h1 className="text-3xl font-extrabold tracking-tight text-emerald-600">
          Promise Uzor
        </h1>
      </Link>

      {/* Hamburger Button for small screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="block md:hidden text-emerald-600"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Navigation Items */}
      <ul
        className={`absolute md:static top-20 left-0 w-full md:w-auto shadow-md md:shadow-none flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 text-lg font-medium z-50 transition-all duration-300 overflow-hidden ${
          isOpen
            ? "block bg-gray-950/20 backdrop-blur-md shadow-xl"
            : "hidden md:flex bg-transparent"
        }`}
      >
        {navItems.map((item) => (
          <li key={item} className="group w-full md:w-auto">
            <Link
              href={`#${item.toLowerCase()}`}
              className="block w-full text-center md:w-auto md:text-left text-emerald-500 transition-all duration-200 hover:scale-105 md:hover:scale-100 md:scale-100 md:hover:text-emerald-600"
              onClick={(e) => handleNavClick(e, item)}
            >
              {item}
              <span className="block h-0.5 bg-emerald-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
