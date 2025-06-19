import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on window resize if screen is large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavClick = () => {
    if (window.innerWidth < 1200) {
      setMenuOpen(false);
    }
  };

  return (
    <nav className="navbar navbar-expand-xl navbar-dark bg-dark fixed-top px-3">
      <span className="navbar-brand fw-bold mx-auto mx-xl-0">
        <span className="logo">C</span>odelkar
      </span>

      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        <FaBars />
      </button>

      <div className={`navbar-collapse ${menuOpen ? "d-block" : "d-none"} d-xl-flex`}>
        <ul className="navbar-nav ms-auto d-flex gap-2 mt-2 mt-xl-0">
          <li className="nav-item">
            <NavLink to="/" className="nav-link" onClick={handleNavClick}>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/services" className="nav-link" onClick={handleNavClick}>
              Services
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/login" className="nav-link" onClick={handleNavClick}>
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/register" className="nav-link" onClick={handleNavClick}>
              Register
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" className="nav-link" onClick={handleNavClick}>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
