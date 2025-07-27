import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Admin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [employeesData, setEmployeesData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState({});

  const filteredEmployees = employeesData.filter(emp =>
    `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/employees");
        const data = await response.json();
        setEmployeesData(data.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployeeData();
  }, []);

  const handleEditClick = (emp) => {
    setEditingId(emp.employeeID);
    setEditedEmployee({ ...emp });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedEmployee({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee(prev => ({ ...prev, [name]: value }));
  };
  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/employees/${editedEmployee.employeeID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedEmployee),
      });

      if (!response.ok) throw new Error('Update failed');

      const updatedList = employeesData.map(emp =>
        emp.employeeID === editedEmployee.employeeID ? editedEmployee : emp
      );

      setEmployeesData(updatedList);
      setEditingId(null);
      setEditedEmployee({});
      alert('Employee updated successfully');
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Update failed');
    }
  };

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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map(emp => (
                <tr key={emp.employeeID}>
                  <td>{emp.employeeID}</td>
                  {editingId === emp.employeeID ? (
                    <>
                      <td><input name="firstName" value={editedEmployee.firstName} onChange={handleInputChange} /></td>
                      <td><input name="lastName" value={editedEmployee.lastName} onChange={handleInputChange} /></td>
                      <td><input name="email" value={editedEmployee.email} onChange={handleInputChange} /></td>
                      <td><input name="phoneNumber" value={editedEmployee.phoneNumber} onChange={handleInputChange} /></td>
                      <td><input name="jobTitle" value={editedEmployee.jobTitle} onChange={handleInputChange} /></td>
                      <td><input name="department" value={editedEmployee.department} onChange={handleInputChange} /></td>
                      <td><input name="hireDate" value={editedEmployee.hireDate} onChange={handleInputChange} /></td>
                      <td><input name="salary" value={editedEmployee.salary} onChange={handleInputChange} /></td>
                      <td><input name="addressLine1" value={editedEmployee.addressLine1} onChange={handleInputChange} /></td>
                      <td><input name="city" value={editedEmployee.city} onChange={handleInputChange} /></td>
                      <td><input name="state" value={editedEmployee.state} onChange={handleInputChange} /></td>
                      <td><input name="zipcode" value={editedEmployee.zipcode} onChange={handleInputChange} /></td>
                      <td>
                        <button className="btn btn-success btn-sm me-1" onClick={handleSave}>Save</button>
                        <button className="btn btn-secondary btn-sm" onClick={handleCancel}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{emp.firstName}</td>
                      <td>{emp.lastName}</td>
                      <td>{emp.email}</td>
                      <td>{emp.phoneNumber}</td>
                      <td>{emp.jobTitle}</td>
                      <td>{emp.department}</td>
                      <td>{emp.hireDate}</td>
                      <td>{emp.salary != null ? `$${emp.salary.toLocaleString()}` : 'N/A'}</td>
                      <td>{emp.addressLine1 + ' ' + emp.addressLine2}</td>
                      <td>{emp.city}</td>
                      <td>{emp.state}</td>
                      <td>{emp.zipcode}</td>
                      <td>
                        <button className="btn btn-primary btn-sm" onClick={() => handleEditClick(emp)}>Edit</button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="14" className="text-center">No employees found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
