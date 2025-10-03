

import React, { useState, useEffect, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../AuthContext";

export default function EmployeeAttendance() {
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [employees, setEmployees] = useState([]);
  const [showEmployeeModal, setEmployeeModal] = useState(false);
  const [showMonthModal, setShowMonthModal] = useState(false);
  const [showYearModal, setShowYearModal] = useState(false);
  const [attendance, setAttendance] = useState([]);
  console.log("attendance data", attendance);
  const [empId, setEmpId] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { user } = useContext(AuthContext);
  const companyId = user?.companyId;
  const role = user?.roles[0];

  // Fetch employee list only for non-employee roles
  const fetchEployeeData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/employees/company/${companyId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Convert month name to number and call backend
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const fetchAttendance = async (email, month, year) => {
    try {
      const monthNumber = months.indexOf(month) + 1;

      const response = await fetch(
        `http://localhost:8080/api/attendance/daily?email=${email}&year=${year}&month=${monthNumber}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const data = await response.json();
      setAttendance(data.data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  useEffect(() => {
    const currentMonth = new Date().toLocaleString("default", { month: "long" });
    const currentYear = new Date().getFullYear();
    setSelectedMonth(currentMonth);
    setSelectedYear(currentYear);

    if (role !== "ROLE_USER") {
      fetchEployeeData();
    } else {
      setSelectedEmployee(user?.username);
      setEmpId(user?.username);
    }
  }, []);

  const handleShowClick = () => {
    setShowModal(true);
    fetchAttendance(empId, selectedMonth, selectedYear);
  };

  // Years array for selection (last 10 years)
  const years = Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - i);

  // Format ISO date to readable string
  function formatDate(isoDate) {
    if (!isoDate) return "";
    const dateObj = new Date(isoDate);
    return dateObj.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  // Determine attendance status dynamically
  function getAttendanceStatus(inTime, outTime) {
    return !inTime || !outTime ? "Absent" : "Present";
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Employee Attendance</h2>

      <div className="row g-3 justify-content-center">
        {/* Employee Selection */}
        <div className="col-12 col-md-4">
          <label className="form-label">Select Employee</label>
          <Button
            variant="outline-secondary"
            className="w-100"
            onClick={() => setEmployeeModal(true)}
            disabled={role === "ROLE_USER"} // freeze for employee
          >
            {selectedEmployee || "Select Employee"}
          </Button>

          <Modal
            show={showEmployeeModal}
            onHide={() => setEmployeeModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Select Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {employees?.map((emp, index) => (
                <Button
                  key={index}
                  variant="light"
                  className="w-100 text-start my-1"
                  onClick={() => {
                    setSelectedEmployee(emp.firstName);
                    setEmpId(emp.email);
                    setEmployeeModal(false);
                  }}
                >
                  {emp.firstName}
                </Button>
              ))}
            </Modal.Body>
          </Modal>
        </div>

        {/* Month Selection */}
        <div className="col-12 col-md-4">
          <label className="form-label">Select Month</label>
          <Button
            variant="outline-secondary"
            className="w-100"
            onClick={() => setShowMonthModal(true)}
          >
            {selectedMonth || "Select Month"}
          </Button>

          <Modal
            show={showMonthModal}
            onHide={() => setShowMonthModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Select Month</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {months.map((month, index) => (
                <Button
                  key={index}
                  variant="light"
                  className="w-100 text-start my-1"
                  onClick={() => {
                    setSelectedMonth(month);
                    setShowMonthModal(false);
                  }}
                >
                  {month}
                </Button>
              ))}
            </Modal.Body>
          </Modal>
        </div>

        {/* Year Selection */}
        <div className="col-12 col-md-4">
          <label className="form-label">Select Year</label>
          <Button
            variant="outline-secondary"
            className="w-100"
            onClick={() => setShowYearModal(true)}
          >
            {selectedYear || "Select Year"}
          </Button>

          <Modal
            show={showYearModal}
            onHide={() => setShowYearModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Select Year</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {years.map((year, index) => (
                <Button
                  key={index}
                  variant="light"
                  className="w-100 text-start my-1"
                  onClick={() => {
                    setSelectedYear(year);
                    setShowYearModal(false);
                  }}
                >
                  {year}
                </Button>
              ))}
            </Modal.Body>
          </Modal>
        </div>
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-success px-4" onClick={handleShowClick}>
          Show
        </button>
      </div>

      {showModal && (
        <div className="table-responsive pt-5">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Date</th>
                <th>In Time</th>
                <th>Out Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.length > 0 ? (
                attendance.map((emp) => (
                  <tr key={emp.Id}>
                    <td>{formatDate(emp.date)}</td>
                    <td>{formatDate(emp.inTime)}</td>
                    <td>{formatDate(emp.outTime)}</td>
                    <td
                      className={
                        getAttendanceStatus(emp.inTime, emp.outTime) === "Absent"
                          ? "text-danger"
                          : "text-success"
                      }
                    >
                      {getAttendanceStatus(emp.inTime, emp.outTime)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No Attendance found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
