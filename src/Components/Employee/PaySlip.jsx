import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownButton,
  Button,
  Card,
  Spinner,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Payslip() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(null);

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
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/employees");
        const data = await response.json();
        setEmployees(data.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployeeData();
  }, []);

  const handleSelectEmployee = (eventKey) => {
    const employee = employees.find(
      (emp) => emp.employeeID === parseInt(eventKey, 10)
    );
    setSelectedEmployee(employee);
  };
  const handleMonthSelection = (eventKey) => {
    setSelectedMonth(eventKey);
  };

  const downloadPayslip = async (employeeID, payMonth, fileName) => {
    try {
      const response = await fetch(
        `http://localhost:8080/payslip/${employeeID}/${payMonth}/pdf`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Error while fetching the Payslip ");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert(
        `The PaySlip is not Available for ${selectedEmployee.firstName} for Month ${selectedMonth}`
      );
    }
  };
  const openPayslipInNewTab = async (employeeID, payMonth) => {
    try {
      const response = await fetch(
        `http://localhost:8080/payslip/${employeeID}/${payMonth}/pdf`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Error while fetching the Payslip");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Open the PDF in a new tab
      window.open(url, "_blank");

      // Optional: Revoke the object URL after some delay
      setTimeout(() => window.URL.revokeObjectURL(url), 10000); // revoke after 10 seconds
    } catch (error) {
      console.error("Error opening PDF:", error);
      alert(
        `The PaySlip is not Available for ${selectedEmployee.firstName} for Month ${selectedMonth}`
      );
    }
  };
  const sendPayslipToEmail = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/payslip/${selectedEmployee.employeeID}/${selectedMonth}/pdf`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch PDF for email");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob); // Temporary Blob URL

      // Open PDF in a new tab
      window.open(url, "_blank");

      // Prepare and open mail client
      const subject = `Payslip for ${selectedEmployee.firstName} ${selectedEmployee.lastName}`;
      const body = `Dear ${selectedEmployee.firstName},\n\nPlease find your payslip in the opened tab.\n\nRegards,\nPayroll Team`;
      window.location.href = `mailto:?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      // Clean up the Blob URL
      setTimeout(() => window.URL.revokeObjectURL(url), 10000);
    } catch (error) {
      console.error("Error sending payslip via email:", error);
      alert(
        `The PaySlip is not available for ${selectedEmployee.firstName} for the month ${selectedMonth}`
      );
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-lg border-0">
            <Card.Body>
              <h3 className="text-center mb-4 text-primary">
                Employee Payslip Portal
              </h3>

              {loading ? (
                <div className="text-center my-4">
                  <Spinner animation="border" role="status" variant="primary" />
                  <div className="mt-2">Loading employees...</div>
                </div>
              ) : (
                <div>
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <DropdownButton
                      id="employee-dropdown"
                      title={
                        selectedEmployee
                          ? `${selectedEmployee.firstName} ${selectedEmployee.lastName}`
                          : "Select Employee"
                      }
                      onSelect={handleSelectEmployee}
                      className="mb-4"
                      variant="outline-primary"
                    >
                      {employees.length > 0 ? (
                        employees.map((emp) => (
                          <Dropdown.Item
                            key={emp.employeeID}
                            eventKey={emp.employeeID}
                          >
                            {emp.firstName} {emp.lastName}
                          </Dropdown.Item>
                        ))
                      ) : (
                        <Dropdown.Item disabled>
                          No Employees Found
                        </Dropdown.Item>
                      )}
                    </DropdownButton>

                    <DropdownButton
                      id="employee-dropdown"
                      title={
                        selectedMonth ? `${selectedMonth} ` : "Select Month"
                      }
                      onSelect={handleMonthSelection}
                      className="mb-4"
                      variant="outline-primary"
                    >
                      {months.length > 0 ? (
                        months.map((month) => (
                          <Dropdown.Item key={month} eventKey={month}>
                            {month}
                          </Dropdown.Item>
                        ))
                      ) : (
                        <Dropdown.Item disabled>No Month Found</Dropdown.Item>
                      )}
                    </DropdownButton>
                  </div>
                  <div className="d-grid gap-3">
                    <Button
                      variant="primary"
                      disabled={!selectedEmployee}
                      onClick={() =>
                        downloadPayslip(
                          selectedEmployee.employeeID,
                          selectedMonth,
                          `${selectedEmployee.firstName}_${selectedEmployee.lastName}_Payslip.pdf`
                        )
                      }
                    >
                      Download Payslip
                    </Button>
                    <Button
                      variant="secondary"
                      disabled={!selectedEmployee}
                      onClick={() =>
                        openPayslipInNewTab(
                          selectedEmployee.employeeID,
                          selectedMonth
                        )
                      }
                    >
                      Open in Browser
                    </Button>
                    <Button
                      variant="success"
                      disabled={!selectedEmployee}
                      onClick={sendPayslipToEmail}
                    >
                      Send to Email
                    </Button>
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
