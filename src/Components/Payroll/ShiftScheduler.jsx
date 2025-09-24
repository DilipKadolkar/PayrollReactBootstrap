
// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../AuthContext';


// const shifts = [
//   { value: 'morning', label: 'Morning' },
//   { value: 'afternoon', label: 'Afternoon' },
//   { value: 'evening', label: 'Evening' },
// ];

// const ShiftScheduler = () => {
//   const [employees, setEmployees] = useState([]);
//   const [selectedShift, setSelectedShift] = useState('');
//   const [selectedEmployees, setSelectedEmployees] = useState([]);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [schedule, setSchedule] = useState(null);
//   const today = new Date().toISOString().split('T')[0];
//   const{token} = useContext(AuthContext)


//   const fetchEployeeData = async () => {
//     try {
//       const response = await fetch("http://localhost:8080/api/employees", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // ✅ add JWT here
//         },
//       });
//       const data = await response.json();
//       setEmployees(data.data);
//     } catch (error) {
//       console.error("Error fetching Employees:", error);
//     }
//   };


//   // Function to handle changes to the shift selector
//   const handleShiftChange = (event) => {
//     setSelectedShift(event.target.value);
//   };

//   // Function to handle changes to the employee multi-selector
//   const handleEmployeeToggle = (employee) => {
//     setSelectedEmployees(prevSelected => {
//       if (prevSelected.includes(employee.id)) {
//         return prevSelected.filter(id => id !== employee.id);
//       } else {
//         return [...prevSelected, employee.id];
//       }
//     });
//   };

//   // Function to handle the form submission
//   const handleSchedule = (event) => {
//     event.preventDefault();

//     // Mock scheduling logic
//     const scheduledData = {
//       shift: selectedShift,
//       employees: selectedEmployees.map(id => employees.find(emp => emp.id === id).name),
//       startDate,
//       endDate,
//     };
//     setSchedule(scheduledData);

//     // Log the data for demonstration
//     console.log('Shift Scheduled:', scheduledData);
//   };

//   useEffect(() => {
//     fetchEployeeData()
//   }, []);

//   return (
//     <div className="container py-5 d-flex justify-content-center align-items-center min-vh-100">
//       <div className="card shadow-lg p-4 p-md-5 w-100" style={{ maxWidth: '600px' }}>
//         <div className="card-body">
//           <h1 className="card-title text-center mb-4">Employee Shift Scheduler</h1>

//           <form onSubmit={handleSchedule} className="row g-3">
//             {/* Shift Selector */}
//             <div className="col-12">
//               <label htmlFor="shift" className="form-label">
//                 Select Shift
//               </label>
//               <select
//                 id="shift"
//                 className="form-select"
//                 value={selectedShift}
//                 onChange={handleShiftChange}
//                 required
//               >
//                 <option value="">-- Select a shift --</option>
//                 {shifts.map(shift => (
//                   <option key={shift.value} value={shift.value}>{shift.label}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Employee Multi-selector */}
//             <div className="col-12">
//               <label htmlFor="employees" className="form-label">
//                 Select Employees
//               </label>
//               <div className="border rounded p-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
//               <ul className="list-group list-group-flush">
//                   {employees.map(employee => (
//                     <li
//                       key={employee.id}
//                       className="list-group-item list-group-item-action"
//                       onClick={() => handleEmployeeToggle(employee)}
//                       role="button"
//                     >
//                       {selectedEmployees.includes(employee.id) && '✅ '}
//                       {employee.firstName}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
             
             
//             </div>

//             {/* Date Pickers */}
//             <div className="col-md-6">
//               <label htmlFor="start-date" className="form-label">
//                 Start Date
//               </label>
//               <input
//                 type="date"
//                 id="start-date"
//                 className="form-control"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 min={today}
//                 required
//               />
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="end-date" className="form-label">
//                 End Date
//               </label>
//               <input
//                 type="date"
//                 id="end-date"
//                 className="form-control"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 min={startDate || today} // Ensure end date is not before start date
//                 required
//               />
//             </div>

//             {/* Schedule Button */}
//             <div className="col-12 mt-4">
//               <button type="submit" className="btn btn-primary w-100">
//                 Schedule
//               </button>
//             </div>
//           </form>

//           {/* Display Scheduled Data */}
//           {schedule && (
//             <div className="mt-4 alert alert-info" role="alert">
//               <h4 className="alert-heading">Scheduled Shift Details</h4>
//               <hr />
//               <p className="mb-0">
//                 <strong>Shift:</strong> <span className="text-capitalize">{schedule.shift}</span>
//               </p>
//               <p className="mb-0">
//                 <strong>Employees:</strong> {schedule.employees.join(', ')}
//               </p>
//               <p className="mb-0">
//                 <strong>Start Date:</strong> {schedule.startDate}
//               </p>
//               <p className="mb-0">
//                 <strong>End Date:</strong> {schedule.endDate}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShiftScheduler;

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';

const shifts = [
  { value: 'morning', label: 'Morning', start: '08:00', end: '12:00' },
  { value: 'afternoon', label: 'Afternoon', start: '12:00', end: '16:00' },
  { value: 'night', label: 'Night', start: '16:00', end: '20:00' },
];

const ShiftScheduler = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedShift, setSelectedShift] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [schedule, setSchedule] = useState(null);
  const today = new Date().toISOString().split('T')[0];
  const { token } = useContext(AuthContext);
  const fetchEmployeeData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/employees', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
         
        },
        credentials: "include", // ✅ ensures cookies are sent
      });
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      console.error('Error fetching Employees:', error);
    }
  };

  const handleShiftChange = (event) => {
    setSelectedShift(event.target.value);
  };

  const handleEmployeeToggle = (employee) => {
    setSelectedEmployees((prevSelected) => {
      if (prevSelected.includes(employee.email)) {
        return prevSelected.filter((email) => email !== employee.email);
      } else {
        return [...prevSelected, employee.email];
      }
    });
  };

  const handleSchedule = async (event) => {
    event.preventDefault();

    if (!selectedShift || selectedEmployees.length === 0) {
      alert('Please select a shift and at least one employee');
      return;
    }

    const chosenShift = shifts.find((s) => s.value === selectedShift);

    const payload = {
      startDate,
      endDate,
      shiftStartTime: chosenShift.start,
      shiftEndTime: chosenShift.end,
      shiftName: selectedShift.toUpperCase(),
      employeeEmails: selectedEmployees,
    };

    try {
      const response = await fetch('http://localhost:8080/assignShift', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         
        },
        credentials: "include", // ✅ ensures cookies are sent
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
        
      }

      const result = await response.json();
      setSchedule(result); // Show backend response
      alert(result.message);
      console.log('Shift Assigned Successfully:', result);
    } catch (error) {
      console.error('Error assigning shift:', error);
 
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4 p-md-5 w-100" style={{ maxWidth: '600px' }}>
        <div className="card-body">
          <h1 className="card-title text-center mb-4">Employee Shift Scheduler</h1>

          <form onSubmit={handleSchedule} className="row g-3">
            {/* Shift Selector */}
            <div className="col-12">
              <label htmlFor="shift" className="form-label">
                Select Shift
              </label>
              <select
                id="shift"
                className="form-select"
                value={selectedShift}
                onChange={handleShiftChange}
                required
              >
                <option value="">-- Select a shift --</option>
                {shifts.map((shift) => (
                  <option key={shift.value} value={shift.value}>
                    {shift.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Employee Multi-selector */}
            <div className="col-12">
              <label htmlFor="employees" className="form-label">
                Select Employees
              </label>
              <div className="border rounded p-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                <ul className="list-group list-group-flush">
                  {employees.map((employee) => (
                    <li
                      key={employee.id}
                      className="list-group-item list-group-item-action"
                      onClick={() => handleEmployeeToggle(employee)}
                      role="button"
                    >
                      {selectedEmployees.includes(employee.email) && '✅ '}
                      {employee.firstName} ({employee.email})
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Date Pickers */}
            <div className="col-md-6">
              <label htmlFor="start-date" className="form-label">
                Start Date
              </label>
              <input
                type="date"
                id="start-date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={today}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="end-date" className="form-label">
                End Date
              </label>
              <input
                type="date"
                id="end-date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate || today}
                required
              />
            </div>

            {/* Schedule Button */}
            <div className="col-12 mt-4">
              <button type="submit" className="btn btn-primary w-100">
                Assign Shift
              </button>
            </div>
          </form>

          {/* Display Scheduled Data */}
          
        </div>
      </div>
    </div>
  );
};

export default ShiftScheduler;
