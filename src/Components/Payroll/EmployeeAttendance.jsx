import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function EmployeeAttendance() {
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [employees, setEmployees] = useState([]);
  const [showEmployeeModal, setEmployeeModal] = useState(false);
  const [showMonthModal, setShowMonthModal] = useState(false);
  const [attendance, setAttendance] = useState([]);
  const [empId, setEmpId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const fetchEployeeData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/employees");
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const fetchAttendance = async (id, month) => {
    try {
      const response = await fetch(
        `http://localhost:8080/records/${id}/${month}`
      );
      const data = await response.json();
      setAttendance(data.data);
    } catch (error) {
      console.error("Error fetching Attendance:", error);
    }
  };

  useEffect(() => {
    const currentMonth = new Date().toLocaleString("default", {
      month: "long",
    });
    setSelectedMonth(currentMonth);
    fetchEployeeData();
    setSelectedMonth("");
  }, []);

  const handleShowClick = () => {
    setShowModal(true);
    fetchAttendance(empId, selectedMonth);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Employee Attendance</h2>

      <div className="row g-3 justify-content-center">
        {/* Company Selection */}
        <div className="col-12 col-md-6">
          <label className="form-label">Select Employee</label>
          <Button
            variant="outline-secondary"
            className="w-100"
            onClick={() => setEmployeeModal(true)}
          >
            {selectedEmployee || "Select a Employee"}
          </Button>

          <Modal
            show={showEmployeeModal}
            onHide={() => setEmployeeModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Select Company</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {employees?.map((emp, index) => (
                <Button
                  key={index}
                  variant="light"
                  className="w-100 text-start my-1"
                  onClick={() => {
                    setSelectedEmployee(emp.firstName);
                    setEmpId(emp.employeeID);
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
        <div className="col-12 col-md-6">
          <label className="form-label">Select Month</label>
          <Button
            variant="outline-secondary"
            className="w-100"
            onClick={() => setShowMonthModal(true)}
          >
            {selectedMonth || "Select month"}
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
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-success px-4" onClick={handleShowClick}>
          Show
        </button>
      </div>

      {showModal ? (
        <div className="table-responsive pt-5">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark ">
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
                    <td> {emp.todayDate}</td>
                    <td> {emp.startTime}</td>
                    <td> {emp.endTime}</td>
                    <td
                      className={
                        emp.attendenceStatus?.toLowerCase() === "absent"
                          ? "text-danger"
                          : "" ||
                            emp.attendenceStatus?.toLowerCase() === "present"
                          ? "text-success"
                          : ""
                      }
                    >
                      {emp.attendenceStatus}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    No Attendance found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <h1></h1>
      )}
    </div>
  );
}
