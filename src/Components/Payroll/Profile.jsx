// import React, { useEffect, useState } from 'react';
// import { AuthContext } from '../AuthContext';

// const Profile = () => {
//   const { user } = React.useContext(AuthContext);
//   const [employee, setEmployee] = useState(null);
//   const [error, setError] = useState(null);
// console.log(employee);
//   const fetchEmployeeData = async (email) => {
//     try {
//       const response = await fetch(`http://localhost:8080/api/employees/email/${email}`, {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch employee data');
//       }

//       const data = await response.json();
//       setEmployee(data.data); // Assuming the API returns the employee data inside `data.data`
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   useEffect(() => {
//     if (user && user.username) {
//       fetchEmployeeData(user.username);
//     }
//   }, [user]);

//   if (error) {
//     return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
//   }

//   if (!employee) {
//     return <div className="flex justify-center items-center min-h-screen">No employee data found.</div>;
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
//         <div className="flex flex-col items-center">
          
//           <h2 className="mt-4 text-xl font-semibold text-gray-800">{employee.fullName || `${employee.firstName} ${employee.lastName}`}</h2>
//           <p className="text-gray-600"><strong>Email:</strong> {employee.email}</p>
//           <p className="text-gray-600"><strong>Phone Number:</strong> {employee.phoneNumber || 'N/A'}</p>
//           <p className="text-gray-600"><strong>Job Title:</strong> {employee.jobTitle || 'N/A'}</p>
//           <p className="text-gray-600"><strong>Department:</strong> {employee.department || 'N/A'}</p>
//           <p className="text-gray-600"><strong>Hire Date:</strong> {employee.hireDate || 'N/A'}</p>
//           <p className="text-gray-600"><strong>Gender:</strong> {employee.gender || 'N/A'}</p>
//           <p className="text-gray-600"><strong>Emergency Contact:</strong> {employee.emergencyContact || 'N/A'}</p>
//           <p className="text-gray-600"><strong>Reporting Manager:</strong> {employee.reportingManager || 'N/A'}</p>
//           <p className="text-gray-600"><strong>Probation Period:</strong> {employee.probationPeriod || 'N/A'}</p>
//           <p className="text-gray-600"><strong>Aadhar Number:</strong> {employee.aadharNumber || 'N/A'}</p>
//           <p className="text-gray-600"><strong>Salary:</strong> {employee.salary ? `₹${employee.salary}` : 'N/A'}</p>
//           <p className="text-gray-600"><strong>Address:</strong></p>
//           <p className="text-gray-600">{employee.addressLine1 || 'N/A'}</p>
//           <p className="text-gray-600">{employee.addressLine2 || ''}</p>
//           <p className="text-gray-600">{employee.city || ''}, {employee.state || ''} {employee.zipCode || ''}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;



import React, { useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';

const Profile = () => {
  const { user } = React.useContext(AuthContext);
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);
    console.log(employee);
  const fetchEmployeeData = async (email) => {
    try {
      const response = await fetch(`http://localhost:8080/api/employees/email/${email}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error('Failed to fetch employee data');
      }

      const data = await response.json();
      setEmployee(data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (user && user.username) {
      fetchEmployeeData(user.username);
    }
  }, [user]);

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  if (!employee) {
    return <div className="flex justify-center items-center min-h-screen">No employee data found.</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
  <div className="bg-white w-full max-w-3xl shadow-sm rounded-xl p-8">

    {/* Title */}
    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
      Employee Profile
    </h2>

    {/* Table */}
    <div className="overflow-x-auto">
      <table className="w-full">
        <tbody className="divide-y divide-gray-200">

          <tr>
            <td className="font-semibold p-4 w-1/3 text-gray-700">Full Name</td>
            <td className="p-4 text-gray-900">
              {employee.fullName || `${employee.firstName} ${employee.lastName}`}
            </td>
          </tr>

          <tr>
            <td className="font-semibold p-4 text-gray-700">Email</td>
            <td className="p-4 text-gray-900">{employee.email}</td>
          </tr>

          <tr>
            <td className="font-semibold p-4 text-gray-700">Phone Number</td>
            <td className="p-4 text-gray-900">{employee.phoneNumber || "N/A"}</td>
          </tr>

          <tr>
            <td className="font-semibold p-4 text-gray-700">Job Title</td>
            <td className="p-4 text-gray-900">{employee.jobTitle || "N/A"}</td>
          </tr>

          <tr>
            <td className="font-semibold p-4 text-gray-700">Department</td>
            <td className="p-4 text-gray-900">{employee.department || "N/A"}</td>
          </tr>

          <tr>
            <td className="font-semibold p-4 text-gray-700">Hire Date</td>
            <td className="p-4 text-gray-900">{employee.hireDate || "N/A"}</td>
          </tr>

          <tr>
            <td className="font-semibold p-4 text-gray-700">Gender</td>
            <td className="p-4 text-gray-900">{employee.gender || "N/A"}</td>
          </tr>

          <tr>
            <td className="font-semibold p-4 text-gray-700">Emergency Contact</td>
            <td className="p-4 text-gray-900">{employee.emergencyContact || "N/A"}</td>
          </tr>

          <tr>
            <td className="font-semibold p-4 text-gray-700">Reporting Manager</td>
            <td className="p-4 text-gray-900">{employee.reportingManager || "N/A"}</td>
          </tr>

          <tr>
            <td className="font-semibold p-4 text-gray-700">Probation Period</td>
            <td className="p-4 text-gray-900">{employee.probationPeriod || "N/A"}</td>
          </tr>

          <tr>
            <td className="font-semibold p-4 text-gray-700">Aadhar Number</td>
            <td className="p-4 text-gray-900">{employee.aadharNumber || "N/A"}</td>
          </tr>

          <tr>
            <td className="font-semibold p-4 text-gray-700">Admin Email</td>
            <td className="p-4 text-gray-900">{employee.adminemail || "N/A"}</td>
          </tr>
          <tr>
            <td className="font-semibold p-4 text-gray-700">Salary</td>
            <td className="p-4 text-gray-900">
              {employee.salary ? `₹${employee.salary}` : "N/A"}
            </td>
          </tr>

          <tr>
            <td className="font-semibold p-4 text-gray-700">Address</td>
            <td className="p-4 leading-6 text-gray-900">
              {employee.addressLine1 || "N/A"} <br />
              {employee.addressLine2} <br />
              {employee.city}, {employee.state} {employee.zipCode}
            </td>
          </tr>

        </tbody>
      </table>
    </div>

  </div>
</div>

  );
};

export default Profile;