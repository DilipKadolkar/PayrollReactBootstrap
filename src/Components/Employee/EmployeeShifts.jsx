
// export default EmployeeShifts;
// import React, { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../AuthContext";

// const EmployeeShifts = () => {
//   const [employees, setEmployees] = useState([]);
//   const [selectedEmail, setSelectedEmail] = useState("");
//   const [shifts, setShifts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [ShiftName] = useState(["MORNING", "AFTERNOON", "NIGHT"]);
//   // Modal state
//   const [showModal, setShowModal] = useState(false);
//   const [selectedShift, setSelectedShift] = useState(null);
//   const [formData, setFormData] = useState({
//     requestedShiftName: "",
//     shiftChangeReason: "",
//     remarks: "",
//   });

//   const { user } = useContext(AuthContext);
//   const role = user?.roles[0];
//   const companyId = user?.companyId;
//   const fetchEmployeeData = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/api/employees/company/${companyId}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
         
//         },
//         credentials: "include", // ✅ ensures cookies are sent
//       });
//       const data = await response.json();
//       setEmployees(data.data);
//     } catch (error) {
//       console.error("Error fetching Employees:", error);
//     }
//   };

//   // 🔹 Fetch employees
//   useEffect(() => {
   
//     fetchEmployeeData();
//   }, []);

//   // 🔹 Fetch shifts for selected employee
//   const fetchShifts = async () => {
//     if (!selectedEmail) return;
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `http://localhost:8080/employeeShifts?email=${selectedEmail}`,
//         {
//           headers: {
         
//           },
//           credentials: "include", // ✅ ensures cookies are sent
//         }
//       );
//       const data = await response.json();
//       if (data && data.data) {
//         setShifts(data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching shifts:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔹 Open modal with prefilled data
//   const openModal = (shift) => {
//     setSelectedShift(shift);
//     setFormData({
//       requestedShiftName: shift.shift.shiftName, // prefill with current shift
//       shiftChangeReason: "",
//       remarks: "",
//     });
//     setShowModal(true);
//   };

//   // 🔹 Handle form input
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // 🔹 Submit shift change request
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedShift) return;

//     const dto = {
//       employeeEmail: selectedEmail,
//       currentShiftName: selectedShift.shift.shiftName,
//       requestedShiftName: formData.requestedShiftName,
//       shiftChangeReason: formData.shiftChangeReason,
//       requestedStartDate: selectedShift.startDate,
//       requestedEndDate: selectedShift.endDate,
//       status: "PENDING",
//       remarks: formData.remarks,
//     };

//     try {
//       const response = await fetch("http://localhost:8080/shiftchangerequest", {
//         method: "POST",
//         headers: {
        
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(dto),
//       });

//       if (!response.ok) throw new Error("Failed to request shift change");

//       alert("Shift change request submitted!");
//       setShowModal(false);
//     } catch (error) {
//       console.error("Error submitting shift change:", error);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h3 className="mb-3">Employee Shift Schedule</h3>

//       {/* Employee dropdown */}
//       <div className="mb-3">
//         <label className="form-label">Select Employee</label>
//         <select
//           className="form-select"
//           value={selectedEmail}
//           onChange={(e) => setSelectedEmail(e.target.value)}
//         >
//           <option value="">-- Select Employee --</option>
//           {employees.map((emp) => (
//             <option key={emp.id} value={emp.email}>
//               {emp.firstName} ({emp.email})
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Load shifts button */}
//       <button
//         className="btn btn-primary mb-3"
//         onClick={fetchShifts}
//         disabled={!selectedEmail || loading}
//       >
//         {loading ? "Loading..." : "Load Shifts"}
//       </button>

//       {/* Shifts table */}
//       {shifts.length > 0 ? (
//         <table className="table table-striped table-hover table-bordered">
//           <thead className="table-dark">
//             <tr>
//               <th>ID</th>
//               <th>Shift Name</th>
//               <th>Start Time</th>
//               <th>End Time</th>
//               <th>Start Date</th>
//               <th>End Date</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {shifts.map((shift) => (
//               <tr key={shift.id}>
//                 <td>{shift.id}</td>
//                 <td>{shift.shift.shiftName}</td>
//                 <td>{shift.shift.shiftStartTime}</td>
//                 <td>{shift.shift.shiftEndTime}</td>
//                 <td>{shift.startDate}</td>
//                 <td>{shift.endDate}</td>
//                 <td>
//                   <span
//                     className={`badge ${
//                       shift.status === "SCHEDULED"
//                         ? "bg-success"
//                         : "bg-secondary"
//                     }`}
//                   >
//                     {shift.status}
//                   </span>
//                 </td>
//                 <td>
//                   <button
//                     className="btn btn-sm btn-warning"
//                     onClick={() => openModal(shift)}
//                   >
//                     Request Change
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         !loading && selectedEmail && <p>No shifts found for {selectedEmail}.</p>
//       )}

//       {/* Modal */}
//       {showModal && (
//         <div className="modal show d-block" tabIndex="-1">
//           <div className="modal-dialog">
//             <form className="modal-content" onSubmit={handleSubmit}>
//               <div className="modal-header">
//                 <h5 className="modal-title">Request Shift Change</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setShowModal(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label className="form-label">Requested Shift</label>
//                   <select
//                     className="form-select"
//                     name="requestedShiftName"
//                     value={formData.requestedShiftName}
//                     onChange={handleChange}
//                   >
//                     <option value="">-- Select Shift --</option>
//                     {ShiftName.map((s) => (
//                       <option key={s.id} value={s}>
//                         {s}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label">Reason</label>
//                   <textarea
//                     className="form-control"
//                     name="shiftChangeReason"
//                     value={formData.shiftChangeReason}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Remarks</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="remarks"
//                     value={formData.remarks}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => setShowModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="btn btn-success">
//                   Submit Request
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmployeeShifts;
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";

const EmployeeShifts = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ShiftName] = useState(["MORNING", "AFTERNOON", "NIGHT"]);
  const [shiftsFetched, setShiftsFetched] = useState(false);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);
  const [formData, setFormData] = useState({
    requestedShiftName: "",
    shiftChangeReason: "",
    remarks: "",
  });

  const { user } = useContext(AuthContext);
  const role = user?.roles[0]; // Employee role: ROLE_USER
  const companyId = user?.companyId;

  // 🔹 Fetch employees only if role is not employee
  const fetchEmployeeData = async () => {
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
      console.error("Error fetching Employees:", error);
    }finally {
      setShiftsFetched(true);   // ✅ mark fetch attempt
      setLoading(false);
    }
  };

  useEffect(() => {
    if (role !== "ROLE_USER") {
      fetchEmployeeData();
    } else {
      // For employee, pre-select themselves
      setSelectedEmail(user?.username);
    }
  }, []);

  // 🔹 Fetch shifts for selected employee
  const fetchShifts = async () => {
    if (!selectedEmail) return;
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/employeeShifts?email=${selectedEmail}`,
        {
          headers: {},
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data && data.data) setShifts(data.data);
    } catch (error) {
      console.error("Error fetching shifts:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Open modal with prefilled data
  const openModal = (shift) => {
    setSelectedShift(shift);
    setFormData({
      requestedShiftName: shift.shift.shiftName,
      shiftChangeReason: "",
      remarks: "",
    });
    setShowModal(true);
  };

  // 🔹 Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Submit shift change request
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedShift) return;

    const dto = {
      employeeEmail: selectedEmail,
      currentShiftName: selectedShift.shift.shiftName,
      requestedShiftName: formData.requestedShiftName,
      shiftChangeReason: formData.shiftChangeReason,
      requestedStartDate: selectedShift.startDate,
      requestedEndDate: selectedShift.endDate,
      status: "PENDING",
      remarks: formData.remarks,
    };

    try {
      const response = await fetch("http://localhost:8080/shiftchangerequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },credentials: "include",
        body: JSON.stringify(dto),
      });

      if (!response.ok) throw new Error("Failed to request shift change");

      alert("Shift change request submitted!");
      setShowModal(false);
    } catch (error) {
      console.error("Error submitting shift change:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Employee Shift Schedule</h3>

      {/* Employee dropdown */}
      <div className="mb-3">
        <label className="form-label">Select Employee</label>
        <select
          className="form-select"
          value={selectedEmail}
          onChange={(e) => setSelectedEmail(e.target.value)}
          disabled={role === "ROLE_USER"} // freeze for employee
        >
          {role === "ROLE_USER" ? (
            <option value={selectedEmail}>{selectedEmail}</option>
          ) : (
            <>
              <option value="">-- Select Employee --</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.email}>
                  {emp.firstName} ({emp.email})
                </option>
              ))}
            </>
          )}
        </select>
      </div>

      {/* Load shifts button */}
      <button
        className="btn btn-primary mb-3"
        onClick={fetchShifts}
        disabled={!selectedEmail || loading}
      >
        {loading ? "Loading..." : "Load Shifts"}
      </button>

      {/* Shifts table */}
      {shifts.length > 0 ? (
        <table className="table table-striped table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Shift Name</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((shift) => (
              <tr key={shift.id}>
                <td>{shift.id}</td>
                <td>{shift.shift.shiftName}</td>
                <td>{shift.shift.shiftStartTime}</td>
                <td>{shift.shift.shiftEndTime}</td>
                <td>{shift.startDate}</td>
                <td>{shift.endDate}</td>
                <td>
                  <span
                    className={`badge ${
                      shift.status === "SCHEDULED"
                        ? "bg-success"
                        : "bg-secondary"
                    }`}
                  >
                    {shift.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => openModal(shift)}
                  >
                    Request Change
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading &&
        shiftsFetched && ( // ✅ only show after fetch attempt
          <p>No shifts found for {selectedEmail}.</p>
        )
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <form className="modal-content" onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Request Shift Change</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Requested Shift</label>
                  <select
                    className="form-select"
                    name="requestedShiftName"
                    value={formData.requestedShiftName}
                    onChange={handleChange}
                  >
                    <option value="">-- Select Shift --</option>
                    {ShiftName.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Reason</label>
                  <textarea
                    className="form-control"
                    name="shiftChangeReason"
                    value={formData.shiftChangeReason}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Remarks</label>
                  <input
                    type="text"
                    className="form-control"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeShifts;
