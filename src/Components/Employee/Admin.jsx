// import React, { useContext, useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { AuthContext } from '../AuthContext';

// function Admin() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [employeesData, setEmployeesData] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [editedEmployee, setEditedEmployee] = useState({});
//   console.log(employeesData)
//   const filteredEmployees = employeesData.filter(emp =>
//     `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   const {user }= useContext(AuthContext)
//   const companyId = user?.companyId;

//   useEffect(() => {
//     const fetchEmployeeData = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/api/employees/company/${companyId}`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
           
//           },
//           credentials: "include", // ✅ ensures cookies are sent
//         });
//         const data = await response.json();
//         setEmployeesData(data.data);
//       } catch (error) {
//         console.error("Error fetching employees:", error);
//       }
//     };
//     fetchEmployeeData();
//   }, []);

//   const handleEditClick = (emp) => {
//     setEditingId(emp.employeeID);
//     setEditedEmployee({ ...emp });
//   };

//   const handleCancel = () => {
//     setEditingId(null);
//     setEditedEmployee({});
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedEmployee(prev => ({ ...prev, [name]: value }));
//   };
//   const handleSave = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/api/employees/${editedEmployee.employeeID}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
        
//         },
//         credentials: "include", // ✅ ensures cookies are sent
//         body: JSON.stringify(editedEmployee),
//       });

//       if (!response.ok) throw new Error('Update failed');

//       const updatedList = employeesData.map(emp =>
//         emp.employeeID === editedEmployee.employeeID ? editedEmployee : emp
//       );

//       setEmployeesData(updatedList);
//       setEditingId(null);
//       setEditedEmployee({});
//       alert('Employee updated successfully');
//     } catch (error) {
//       console.error('Error updating employee:', error);
//       alert('Update failed');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Employee Details</h2>

//       <input
//         type="text"
//         className="form-control mb-3"
//         placeholder="Search by name or last name..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       <div className="table-responsive">
//         <table className="table table-bordered table-striped">
//           <thead className="thead-dark">
//             <tr>
//               <th>Id</th>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Email</th>
//               <th>Phone Number</th>
//               <th>Job Title</th>
//               <th>Department</th>
//               <th>Hire Date</th>
//               <th>Salary</th>
//               <th>Address</th>
//               <th>City</th>
//               <th>State</th>
//               <th>Zipcode</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredEmployees.length > 0 ? (
//               filteredEmployees.map(emp => (
//                 <tr key={emp.employeeID}>
//                   <td>{emp.employeeID}</td>
//                   {editingId === emp.employeeID ? (
//                     <>
//                       <td><input name="firstName" value={editedEmployee.firstName} onChange={handleInputChange} /></td>
//                       <td><input name="lastName" value={editedEmployee.lastName} onChange={handleInputChange} /></td>
//                       <td><input name="email" value={editedEmployee.email} onChange={handleInputChange} /></td>
//                       <td><input name="phoneNumber" value={editedEmployee.phoneNumber} onChange={handleInputChange} /></td>
//                       <td><input name="jobTitle" value={editedEmployee.jobTitle} onChange={handleInputChange} /></td>
//                       <td><input name="department" value={editedEmployee.department} onChange={handleInputChange} /></td>
//                       <td><input name="hireDate" value={editedEmployee.hireDate} onChange={handleInputChange} /></td>
//                       <td><input name="salary" value={editedEmployee.salary} onChange={handleInputChange} /></td>
//                       <td><input name="addressLine1" value={editedEmployee.addressLine1} onChange={handleInputChange} /></td>
//                       <td><input name="city" value={editedEmployee.city} onChange={handleInputChange} /></td>
//                       <td><input name="state" value={editedEmployee.state} onChange={handleInputChange} /></td>
//                       <td><input name="zipcode" value={editedEmployee.zipcode} onChange={handleInputChange} /></td>
//                       <td>
//                         <button className="btn btn-success btn-sm me-1" onClick={handleSave}>Save</button>
//                         <button className="btn btn-secondary btn-sm" onClick={handleCancel}>Cancel</button>
//                       </td>
//                     </>
//                   ) : (
//                     <>
//                       <td>{emp.firstName}</td>
//                       <td>{emp.lastName}</td>
//                       <td>{emp.email}</td>
//                       <td>{emp.phoneNumber}</td>
//                       <td>{emp.jobTitle}</td>
//                       <td>{emp.department}</td>
//                       <td>{emp.hireDate}</td>
//                       <td>{emp.salary != null ? `$${emp.salary.toLocaleString()}` : 'N/A'}</td>
//                       <td>{emp.addressLine1 + ' ' + emp.addressLine2}</td>
//                       <td>{emp.city}</td>
//                       <td>{emp.state}</td>
//                       <td>{emp.zipcode}</td>
//                       <td>
//                         <button className="btn btn-primary btn-sm" onClick={() => handleEditClick(emp)}>Edit</button>
//                       </td>
//                     </>
//                   )}
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="14" className="text-center">No employees found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Admin;


// ------------refactor for more fields and edit functionality
// import React, { useContext, useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { AuthContext } from '../AuthContext';

// function Admin() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [employeesData, setEmployeesData] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [editedEmployee, setEditedEmployee] = useState({});
//   const { user } = useContext(AuthContext);
//   const companyId = user?.companyId;

//   const filteredEmployees = employeesData.filter(emp =>
//     `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   useEffect(() => {
//     if (!companyId) return;

//     const fetchEmployeeData = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/api/employees/company/${companyId}`, {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//         });
//         const data = await response.json();
//         setEmployeesData(data.data || []);
//       } catch (error) {
//         console.error("Error fetching employees:", error);
//       }
//     };

//     fetchEmployeeData();
//   }, [companyId]);

//   const handleEditClick = (emp) => {
//     setEditingId(emp.employeeID);
//     setEditedEmployee({ ...emp });
//   };

//   const handleCancel = () => {
//     setEditingId(null);
//     setEditedEmployee({});
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedEmployee(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSave = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/api/employees/${editedEmployee.employeeID}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: "include",
//         body: JSON.stringify(editedEmployee),
//       });

//       if (!response.ok) throw new Error('Update failed');

//       const updatedList = employeesData.map(emp =>
//         emp.employeeID === editedEmployee.employeeID ? editedEmployee : emp
//       );

//       setEmployeesData(updatedList);
//       setEditingId(null);
//       setEditedEmployee({});
//       alert('Employee updated successfully');
//     } catch (error) {
//       console.error('Error updating employee:', error);
//       alert('Update failed');
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   };

//   const formatSalary = (salary) => salary != null ? salary.toLocaleString() : 'N/A';

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Employee Details</h2>

//       <input
//         type="text"
//         className="form-control mb-3"
//         placeholder="Search by name..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       <div className="table-responsive">
//         <table className="table table-bordered table-striped">
//           <thead className="thead-dark">
//             <tr>
//               <th>ID</th>
//               <th>Full Name</th>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Father Name</th>
//               <th>Birth Date</th>
//               <th>Gender</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Emergency Contact</th>
//               <th>Reporting Manager</th>
//               <th>Probation Period</th>
//               <th>Aadhar Number</th>
//               <th>Employee Type</th>
//               <th>Job Title</th>
//               <th>Department</th>
//               <th>Hire Date</th>
//               <th>Salary</th>
//               <th>Address</th>
//               <th>City</th>
//               <th>State</th>
//               <th>Zip</th>
//               <th>User ID</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredEmployees.length > 0 ? (
//               filteredEmployees.map(emp => (
//                 <tr key={emp.employeeID}>
//                   <td>{emp.employeeID}</td>
//                   {editingId === emp.employeeID ? (
//                     <>
//                       <td><input name="fullName" value={editedEmployee.fullName || ''} onChange={handleInputChange} /></td>
//                       <td><input name="firstName" value={editedEmployee.firstName || ''} onChange={handleInputChange} /></td>
//                       <td><input name="lastName" value={editedEmployee.lastName || ''} onChange={handleInputChange} /></td>
//                       <td><input name="fatherName" value={editedEmployee.fatherName || ''} onChange={handleInputChange} /></td>
//                       <td><input name="birthDate" value={editedEmployee.birthDate || ''} onChange={handleInputChange} type="date" /></td>
//                       <td><input name="gender" value={editedEmployee.gender || ''} onChange={handleInputChange} /></td>
//                       <td><input name="email" value={editedEmployee.email || ''} onChange={handleInputChange} /></td>
//                       <td><input name="phoneNumber" value={editedEmployee.phoneNumber || ''} onChange={handleInputChange} /></td>
//                       <td><input name="emergencyContact" value={editedEmployee.emergencyContact || ''} onChange={handleInputChange} /></td>
//                       <td><input name="reportingManager" value={editedEmployee.reportingManager || ''} onChange={handleInputChange} /></td>
//                       <td><input name="probationPeriod" value={editedEmployee.probationPeriod || ''} onChange={handleInputChange} /></td>
//                       <td><input name="aadharNumber" value={editedEmployee.aadharNumber || ''} onChange={handleInputChange} /></td>
//                       <td><input name="employeeType" value={editedEmployee.employeeType || ''} onChange={handleInputChange} /></td>
//                       <td><input name="jobTitle" value={editedEmployee.jobTitle || ''} onChange={handleInputChange} /></td>
//                       <td><input name="department" value={editedEmployee.department || ''} onChange={handleInputChange} /></td>
//                       <td><input name="hireDate" value={editedEmployee.hireDate || ''} onChange={handleInputChange} type="date" /></td>
//                       <td><input name="salary" value={editedEmployee.salary || ''} onChange={handleInputChange} type="number" /></td>
//                       <td><input name="addressLine1" value={editedEmployee.addressLine1 || ''} onChange={handleInputChange} /></td>
//                       <td><input name="city" value={editedEmployee.city || ''} onChange={handleInputChange} /></td>
//                       <td><input name="state" value={editedEmployee.state || ''} onChange={handleInputChange} /></td>
//                       <td><input name="zipCode" value={editedEmployee.zipCode || ''} onChange={handleInputChange} /></td>
//                       <td><input name="userId" value={editedEmployee.userId || ''} onChange={handleInputChange} /></td>
//                       <td>
//                         <button className="btn btn-success btn-sm me-1" onClick={handleSave}>Save</button>
//                         <button className="btn btn-secondary btn-sm" onClick={handleCancel}>Cancel</button>
//                       </td>
//                     </>
//                   ) : (
//                     <>
//                       <td>{emp.fullName || `${emp.firstName} ${emp.lastName}`}</td>
//                       <td>{emp.firstName}</td>
//                       <td>{emp.lastName}</td>
//                       <td>{emp.fatherName || 'N/A'}</td>
//                       <td>{formatDate(emp.birthDate)}</td>
//                       <td>{emp.gender || 'N/A'}</td>
//                       <td>{emp.email}</td>
//                       <td>{emp.phoneNumber || 'N/A'}</td>
//                       <td>{emp.emergencyContact || 'N/A'}</td>
//                       <td>{emp.reportingManager || 'N/A'}</td>
//                       <td>{emp.probationPeriod || 'N/A'}</td>
//                       <td>{emp.aadharNumber || 'N/A'}</td>
//                       <td>{emp.employeeType || 'N/A'}</td>
//                       <td>{emp.jobTitle || 'N/A'}</td>
//                       <td>{emp.department || 'N/A'}</td>
//                       <td>{formatDate(emp.hireDate)}</td>
//                       <td>{formatSalary(emp.salary)}</td>
//                       <td>{[emp.addressLine1, emp.addressLine2].filter(Boolean).join(', ') || 'N/A'}</td>
//                       <td>{emp.city || 'N/A'}</td>
//                       <td>{emp.state || 'N/A'}</td>
//                       <td>{emp.zipCode || 'N/A'}</td>
//                       <td>{emp.userId || 'N/A'}</td>
//                       <td>
//                         <button className="btn btn-primary btn-sm" onClick={() => handleEditClick(emp)}>Edit</button>
//                       </td>
//                     </>
//                   )}
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="25" className="text-center">No employees found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Admin;




//-------refactor for modal edit functionality




import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { AuthContext } from '../AuthContext';

function Admin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [employeesData, setEmployeesData] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const { user } = useContext(AuthContext);
  const companyId = user?.companyId;

  const filteredEmployees = employeesData.filter(emp =>
    `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (!companyId) return;

    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/employees/company/${companyId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await response.json();
        setEmployeesData(data.data || []);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployeeData();
  }, [companyId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingEmployee(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/employees/${editingEmployee.employeeID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
        body: JSON.stringify(editingEmployee),
      });

      if (!response.ok) throw new Error('Update failed');

      const updatedList = employeesData.map(emp =>
        emp.employeeID === editingEmployee.employeeID ? editingEmployee : emp
      );

      setEmployeesData(updatedList);
      setEditingEmployee(null);
      alert('Employee updated successfully');
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Update failed');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // YYYY-MM-DD for input type="date"
  };

  const formatSalary = (salary) => salary != null ? salary.toLocaleString() : '';

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Employee Details</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Job Title</th>
              <th>Department</th>
              <th>Hire Date</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map(emp => (
                <tr key={emp.employeeID}>
                  <td>{emp.employeeID}</td>
                  <td>{emp.fullName || `${emp.firstName} ${emp.lastName}`}</td>
                  <td>{emp.email}</td>
                  <td>{emp.phoneNumber}</td>
                  <td>{emp.jobTitle}</td>
                  <td>{emp.department}</td>
                  <td>{emp.hireDate ? formatDate(emp.hireDate) : ''}</td>
                  <td>{formatSalary(emp.salary)}</td>
                  <td>
                    <Button variant="primary" size="sm" onClick={() => setEditingEmployee(emp)}>Edit</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">No employees found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Employee Modal */}
      {editingEmployee && (
        <Modal show={true} onHide={() => setEditingEmployee(null)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row">
                {[
                  { label: 'Full Name', name: 'fullName', type: 'text' },
                  { label: 'First Name', name: 'firstName', type: 'text' },
                  { label: 'Last Name', name: 'lastName', type: 'text' },
                  { label: 'Father Name', name: 'fatherName', type: 'text' },
                  { label: 'Birth Date', name: 'birthDate', type: 'date' },
                  { label: 'Gender', name: 'gender', type: 'text' },
                  { label: 'Email', name: 'email', type: 'email' },
                  { label: 'Phone Number', name: 'phoneNumber', type: 'text' },
                  { label: 'Emergency Contact', name: 'emergencyContact', type: 'text' },
                  { label: 'Reporting Manager', name: 'reportingManager', type: 'text' },
                  { label: 'Probation Period', name: 'probationPeriod', type: 'text' },
                  { label: 'Aadhar Number', name: 'aadharNumber', type: 'text' },
                  { label: 'Employee Type', name: 'employeeType', type: 'text' },
                  { label: 'Job Title', name: 'jobTitle', type: 'text' },
                  { label: 'Department', name: 'department', type: 'text' },
                  { label: 'Hire Date', name: 'hireDate', type: 'date' },
                  { label: 'Salary', name: 'salary', type: 'number' },
                  { label: 'Address Line 1', name: 'addressLine1', type: 'text' },
                  { label: 'Address Line 2', name: 'addressLine2', type: 'text' },
                  { label: 'City', name: 'city', type: 'text' },
                  { label: 'State', name: 'state', type: 'text' },
                  { label: 'Zip Code', name: 'zipCode', type: 'text' },
                  { label: 'User ID', name: 'userId', type: 'text' },
                ].map(field => (
                  <div className="col-md-12 mb-2" key={field.name}>
                    <label>{field.label}</label>
                    <input
                      type={field.type}
                      className="form-control"
                      name={field.name}
                      value={editingEmployee[field.name] || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEditingEmployee(null)}>Cancel</Button>
            <Button variant="success" onClick={handleSave}>Save</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default Admin;
