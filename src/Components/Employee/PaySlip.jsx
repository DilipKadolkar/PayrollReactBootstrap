import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownButton,
  Button,
  Card,
  Spinner
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Payslip() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/employees');
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployeeData();
  }, []);

  const handleSelectEmployee = (eventKey) => {
    const employee = employees.find(emp => emp.employeeID === parseInt(eventKey, 10));
    setSelectedEmployee(employee);
  };

  const handleAction = (action) => {
    if (!selectedEmployee) {
      alert('Please select an employee first.');
      return;
    }

    switch (action) {
      case 'download': {
        const link = document.createElement('a');
        link.href = selectedEmployee.payslipUrl;
        link.setAttribute('download', `${selectedEmployee.firstName}_${selectedEmployee.lastName}_Payslip.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        break;
      }
      case 'open':
        window.open(selectedEmployee.payslipUrl, '_blank');
        break;
      case 'email': {
        const subject = `Payslip for ${selectedEmployee.firstName} ${selectedEmployee.lastName}`;
        const body = `Dear ${selectedEmployee.firstName},\n\nPlease find your payslip here: ${selectedEmployee.payslipUrl}`;
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        break;
      }
      default:
        console.error('Unknown action');
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-lg border-0">
            <Card.Body>
              <h3 className="text-center mb-4 text-primary">Employee Payslip Portal</h3>

              {loading ? (
                <div className="text-center my-4">
                  <Spinner animation="border" role="status" variant="primary" />
                  <div className="mt-2">Loading employees...</div>
                </div>
              ) : (
                <>
                  <DropdownButton
                    id="employee-dropdown"
                    title={selectedEmployee ? `${selectedEmployee.firstName} ${selectedEmployee.lastName}` : 'Select Employee'}
                    onSelect={handleSelectEmployee}
                    className="mb-4"
                    variant="outline-primary"
                  >
                    {employees.length > 0 ? (
                      employees.map(emp => (
                        <Dropdown.Item key={emp.employeeID} eventKey={emp.employeeID}>
                          {emp.firstName} {emp.lastName}
                        </Dropdown.Item>
                      ))
                    ) : (
                      <Dropdown.Item disabled>No Employees Found</Dropdown.Item>
                    )}
                  </DropdownButton>

                  <div className="d-grid gap-3">
                    <Button
                      variant="primary"
                      disabled={!selectedEmployee}
                      onClick={() => handleAction('download')}
                    >
                      Download Payslip
                    </Button>
                    <Button
                      variant="secondary"
                      disabled={!selectedEmployee}
                      onClick={() => handleAction('open')}
                    >
                      Open in Browser
                    </Button>
                    <Button
                      variant="success"
                      disabled={!selectedEmployee}
                      onClick={() => handleAction('email')}
                    >
                      Send to Email
                    </Button>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
