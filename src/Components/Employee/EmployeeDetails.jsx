import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function EmployeeDetails() {
  const [searchTerm, setSearchTerm] = useState('');
  const [employeesData , setemployeesData] = useState([])
  const filteredEmployees = employeesData.filter(emp =>
    `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(()=>{
    const fetchEployeeData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/employees");
        const data = await response.json();
        setemployeesData(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchEployeeData();
  },[])

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Employee Details</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name or last name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Job Title</th>
              <th>Department</th>
              <th>Hire Date</th>
              <th>Salary</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Zipcode</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map(emp => (
                <tr key={emp.id}>
                  <td>{emp.employeeID}</td>
                  <td>{emp.firstName}</td>
                  <td>${emp.lastName}</td>
                  <td>{emp.email}</td>
                  <td>{emp.phoneNumber}</td>
                  <td>${emp.jobTitle}</td>
                  <td>{emp.department}</td>
                  <td>{emp.hireDate}</td>
                  <td>${emp.salary.toLocaleString()}</td>
                  <td>{emp.addressLine1 + emp.addressLine2}</td>
                  <td>{emp.city}</td>
                  <td>${emp.state}</td>
                  <td>{emp.zipcode}</td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">No employees found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeDetails;
