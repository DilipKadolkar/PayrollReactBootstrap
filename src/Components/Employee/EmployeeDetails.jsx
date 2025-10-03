// import React, { useContext, useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { AuthContext } from '../AuthContext';


// function EmployeeDetails() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [employeesData , setemployeesData] = useState([])
//   const filteredEmployees = employeesData?.filter(emp =>
//     `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   const {user} = useContext(AuthContext)
//   const companyId = user?.companyId;
//   console.log('companyId', employeesData)
//   useEffect(()=>{
//     const fetchEployeeData = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/api/employees/company/${companyId}`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include", // ✅ ensures cookies are sent
//         });
//         const data = await response.json();
//         setemployeesData(data.data);
//       } catch (error) {
//         console.error("Error fetching companies:", error);
//       }
//     };
//     fetchEployeeData();
//   },[])

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
//             </tr>
//           </thead>
//           <tbody>
//             {filteredEmployees?.length > 0 ? (
//               filteredEmployees.map(emp => (
//                 <tr key={emp.id}>
//                   <td>{emp.employeeID}</td>
//                   <td>{emp.firstName}</td>
//                   <td>${emp.lastName}</td>
//                   <td>{emp.email}</td>
//                   <td>{emp.phoneNumber}</td>
//                   <td>${emp.jobTitle}</td>
//                   <td>{emp.department}</td>
//                   <td>{emp.hireDate}</td>
//                   <td>${emp.salary != null ? emp.salary.toLocaleString() : 'N/A'}</td>

//                   <td>{emp.addressLine1 + emp.addressLine2}</td>
//                   <td>{emp.city}</td>
//                   <td>${emp.state}</td>
//                   <td>{emp.zipcode}</td>

//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="3" className="text-center">No employees found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default EmployeeDetails;
import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../AuthContext';


function EmployeeDetails() {
  const [searchTerm, setSearchTerm] = useState('');
  const [employeesData, setEmployeesData] = useState([]);
  const { user } = useContext(AuthContext);
  const companyId = user?.companyId;
  // Filter employees by firstName + lastName
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

  // Format date as yyyy-mm-dd
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Format salary
  const formatSalary = (salary) => salary != null ? salary.toLocaleString() : 'N/A';

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
              <th>First Name</th>
              <th>Last Name</th>
              <th>Father Name</th>
              <th>Birth Date</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Emergency Contact</th>
              <th>Reporting Manager</th>
              <th>Probation Period</th>
              <th>Aadhar Number</th>
              <th>Employee Type</th>
              <th>Job Title</th>
              <th>Department</th>
              <th>Hire Date</th>
              <th>Salary</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Zip</th>
              <th>User ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map(emp => (
                <tr key={emp.employeeID}>
                  <td>{emp.employeeID}</td>
                  <td>{emp.fullName || `${emp.firstName} ${emp.lastName}`}</td>
                  <td>{emp.firstName}</td>
                  <td>{emp.lastName}</td>
                  <td>{emp.fatherName || 'N/A'}</td>
                  <td>{formatDate(emp.birthDate)}</td>
                  <td>{emp.gender || 'N/A'}</td>
                  <td>{emp.email}</td>
                  <td>{emp.phoneNumber || 'N/A'}</td>
                  <td>{emp.emergencyContact || 'N/A'}</td>
                  <td>{emp.reportingManager || 'N/A'}</td>
                  <td>{emp.probationPeriod || 'N/A'}</td>
                  <td>{emp.aadharNumber || 'N/A'}</td>
                  <td>{emp.employeeType || 'N/A'}</td>
                  <td>{emp.jobTitle || 'N/A'}</td>
                  <td>{emp.department || 'N/A'}</td>
                  <td>{formatDate(emp.hireDate)}</td>
                  <td>{formatSalary(emp.salary)}</td>
                  <td>{[emp.addressLine1, emp.addressLine2].filter(Boolean).join(', ') || 'N/A'}</td>
                  <td>{emp.city || 'N/A'}</td>
                  <td>{emp.state || 'N/A'}</td>
                  <td>{emp.zipCode || 'N/A'}</td>
                  <td>{emp.userId || 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="24" className="text-center">No employees found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeDetails;
