// import React, { useState, useEffect, useContext } from "react";
// import { NavLink ,useNavigate} from "react-router-dom";
// import { FaBars } from "react-icons/fa";
// import { AuthContext } from "./AuthContext";

// function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   // Close menu on window resize if screen is large
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1200) {
//         setMenuOpen(false);
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   const handleNavClick = () => {
//     if (window.innerWidth < 1200) {
//       setMenuOpen(false);
//     }
//   };

//   const { user , logout} = useContext(AuthContext)
 
//   const handleLogOut = async () => {
   
//     try {
//       await logout(); // call backend and clear cookies
//       navigate("/login"); // redirect to login page
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };
//   return (
//     <nav className="navbar navbar-expand-xl navbar-dark bg-dark fixed-top px-3">
//       <span className="navbar-brand fw-bold mx-auto mx-xl-0">
//         <span className="logo">C</span>odelkar
//       </span>

//       <button
//         className="navbar-toggler"
//         type="button"
//         onClick={toggleMenu}
//         aria-label="Toggle navigation"
//       >
//         <FaBars />
//       </button>

//       <div className={`navbar-collapse ${menuOpen ? "d-block" : "d-none"} d-xl-flex`}>
//       <ul className="navbar-nav ms-auto d-flex gap-2 mt-2 mt-xl-0">
//   {!user ? (
//     <>
//       <li className="nav-item">
//         <NavLink to="/" className="nav-link" onClick={handleNavClick}>
//           Home
//         </NavLink>
//       </li>
//       <li className="nav-item">
//         <NavLink to="/services" className="nav-link" onClick={handleNavClick}>
//           Services
//         </NavLink>
//       </li>
//       <li className="nav-item">
//         <NavLink to="/login" className="nav-link" onClick={handleNavClick}>
//           Login
//         </NavLink>
//       </li>
//       <li className="nav-item">
//         <NavLink to="/register" className="nav-link" onClick={handleNavClick}>
//           Register
//         </NavLink>
//       </li>
//       <li className="nav-item">
//         <NavLink to="/contact" className="nav-link" onClick={handleNavClick}>
//           Contact
//         </NavLink>
//       </li>
//     </>
//   ) : (
// //     <li className="nav-item">
// //   <button
// //     className="nav-link btn btn-link text-decoration-none"
// //     onClick={async () => {
// //       await handleLogOut();
// //       navigate("/login");
// //     }}
// //   >
// //     Log Out
// //   </button>
// //   <button
// //     className="nav-link btn btn-link text-decoration-none"
// //     // onClick={() => {
// //     //   navigate("/dashboard/payroll");
// //     // }}
// //   >
// //     Profile
// //   </button>
// // </li>

// <li className="nav-item d-flex gap-2">
//   <button
//     className="nav-link btn btn-link text-decoration-none"
//     onClick={async () => {
//       await handleLogOut();
//       navigate("/login");
//     }}
//   >
//     Log Out
//   </button>
//   <button
//     className="nav-link btn btn-link text-decoration-none"
//     onClick={() => {
//       navigate("/dashboard/profile");
//     }}
//   >
//     Profile
//   </button>
// </li>

//   )}
// </ul>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaUser } from "react-icons/fa";
import { AuthContext } from "./AuthContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

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

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleNavClick = () => {
    if (window.innerWidth < 1200) {
      setMenuOpen(false);
    }
  };

  const handleLogOut = async () => {
    try {
      await logout(); // Call backend and clear cookies
      navigate("/login"); // Redirect to login page
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const unauthenticatedLinks = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/login", label: "Login" },
    { to: "/register", label: "Register" },
    { to: "/contact", label: "Contact" },
  ];

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
          {!user ? (
            unauthenticatedLinks.map((link) => (
              <li className="nav-item" key={link.to}>
                <NavLink to={link.to} className="nav-link" onClick={handleNavClick}>
                  {link.label}
                </NavLink>
              </li>
            ))
          ) : (
            <li className="nav-item d-flex align-items-center gap-2">
               <button
                className="nav-link btn btn-link text-decoration-none"
                onClick={() => navigate("/dashboard/payroll/profile")}
              >
                <FaUser />
              </button>
              <button
                className="nav-link btn btn-link text-decoration-none"
                onClick={handleLogOut}
              >
                Log Out
              </button>
             
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;