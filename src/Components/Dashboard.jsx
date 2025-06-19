import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Dashboard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarVisible(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);


  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      setSidebarVisible(false);
    }
  };

  return (
    <div className="container-fluid">
      <button
        className="btn btn-dark d-md-none"
        style={{ position: "fixed", top: "10px", left: "10px", zIndex: 1100 }}
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      {sidebarVisible && (
        <div
          className="bg-dark text-white p-4"
          style={{
            width: "200px",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1050,
            paddingTop: "60px",
            marginTop: "55px",
          }}
        >
          <ul className="nav flex-column mt-4">
            <li className="nav-item mb-3">
              <NavLink
                to="/dashboard/payroll"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `nav-link text-white ${isActive ? "fw-bold text-warning" : ""}`
                }
              >
                Payroll
              </NavLink>
            </li>
            <li className="nav-item mb-3">
              <NavLink
                to="/dashboard/employee"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `nav-link text-white ${isActive ? "fw-bold text-warning" : ""}`
                }
              >
                Employee
              </NavLink>
            </li>
          </ul>
        </div>
      )}

      {/* Main content area */}
      <div
        className="col"
        style={{
          marginLeft: sidebarVisible && window.innerWidth >= 768 ? "200px" : "0",
          paddingTop: "60px",
          transition: "margin-left 0.3s ease",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
