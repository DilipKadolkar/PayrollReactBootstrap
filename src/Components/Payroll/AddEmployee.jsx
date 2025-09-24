// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faUser, faCalendar, faPhone, faEnvelope, faIdCard,
//   faBuilding, faUserTie, faVenusMars, faClock,
//   faHome, faMoneyBill, faIdBadge, faUserFriends
// } from "@fortawesome/free-solid-svg-icons";
// import { Modal, Button } from 'react-bootstrap';

// export default function AddEmployee() {
//   const [selectedCompany, setSelectedCompany] = useState("");
//   const [companyData,setCompanyData] = useState(null)
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [fatherName, setFatherName] = useState("");
//   const [birthDate, setBirthDate] = useState("");
//   const [hireDate, setHireDate] = useState("");
//   const [gender, setGender] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [emergencyContact, setEmergencyContact] = useState("");
//   const [reportingManager, setReportingManager] = useState("");
//   const [probationPeriod, setProbationPeriod] = useState("");
//   const [aadharNumber, setAadharNumber] = useState("");
//   const [email, setEmail] = useState("");
//   const [employeeType, setEmployeeType] = useState("");
//   const [addressLine1, setAddressLine1] = useState("");
//   const [addressLine2, setAddressLine2] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [zipCode, setZipCode] = useState("");
//   const [salary, setSalary] = useState("");
//   const [employeeID, setEmployeeId] = useState("");
//   const [companies, setCompanies] = useState([]);
//   const [showCompanyModal, setShowCompanyModal] = useState(false);
//   console.log(selectedCompany)  
//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   const fetchCompanies = async () => {
//     try {
//       const response = await fetch("http://localhost:8080/api/companies");
//       const data = await response.json();
//       setCompanies(data.data);
//     } catch (err) {
//       console.error("Error fetching companies:", err);
//     }
//   };


  
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedCompany || !firstName) {
//       return alert("Please select a company and enter a name.");
//     }

//     const payload = {
//       companyId: companyData.id, firstName, lastName, fatherName, birthDate, hireDate, gender,
//       phoneNumber, emergencyContact, reportingManager, probationPeriod, aadharNumber,
//       email, employeeType, addressLine1, addressLine2, city, state, zipCode, salary, employeeID,
//     };

//     try {
//       const res = await fetch("http://localhost:8080/api/employees", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (res.ok) {
//         alert("Employee added successfully");
//         Object.keys(payload).forEach(key => {
//           if (typeof payload[key] === "string") {
//             const setter = eval(`set${key.charAt(0).toUpperCase() + key.slice(1)}`);
//             if (typeof setter === "function") setter("");
//           }
//         });
//       } else {
//         alert("Error adding employee");
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       alert("Error adding employee");
//     }
//   };

//   const renderInput = (icon, placeholder, value, setter, type ) => (
//     <div className="col-md-6 mb-3">
//       <div className="input-group">
//         <span className="input-group-text bg-light"><FontAwesomeIcon icon={icon} /></span>
//         <input
//           type={type}
//           className="form-control"
//           placeholder={placeholder}
//           value={value}
//           onChange={(e) => setter(e.target.value)}
//         />
//       </div>
//     </div>
//   );

//   return (
//     <div className="container my-4">
//       <div className="card shadow p-4">
//         <h2 className="text-center mb-4">Add Employee</h2>
//         <form onSubmit={handleFormSubmit}>
//           <div className="mb-4">
//             <label className="form-label"><FontAwesomeIcon icon={faBuilding} /> Select Company</label>
//             <div>
//               <Button variant="outline-secondary" className="w-100 text-start" onClick={() => setShowCompanyModal(true)}>
//                 {selectedCompany || "Select a company"}
//               </Button>
//             </div>
//           </div>

//           <Modal show={showCompanyModal} onHide={() => setShowCompanyModal(false)} centered scrollable>
//             <Modal.Header closeButton>
//               <Modal.Title>Select Company</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               {companies.map((c, i) => (
//                 <Button
//                   key={i}
//                   variant="light"
//                   className="w-100 mb-2 text-start"
//                   onClick={() => {
//                     setSelectedCompany(c.companyName);
//                     setCompanyData(c)
//                     setShowCompanyModal(false);
//                   }}
//                 >
//                   {c.companyName}
//                 </Button>
//               ))}
//             </Modal.Body>
//           </Modal>

//           <div className="row">
//             {renderInput(faUser, "First Name", firstName, setFirstName,'text')}
//             {renderInput(faUser, "Last Name", lastName, setLastName,'text')}
//             {renderInput(faUser, "Father Name", fatherName, setFatherName,'text')}
//             {renderInput(faCalendar, "Birth Date", birthDate, setBirthDate, "date")}
//             {renderInput(faCalendar, "Hire Date", hireDate, setHireDate, "date")}
//             <div className="col-md-6 mb-3">
//               <label className="form-label"><FontAwesomeIcon icon={faVenusMars} /> Gender</label>
//               <div>
//                 <div className="form-check form-check-inline">
//                   <input type="radio" className="form-check-input" id="male" name="gender" value="Male" checked={gender === "Male"} onChange={(e) => setGender(e.target.value)} />
//                   <label className="form-check-label" htmlFor="male">Male</label>
//                 </div>
//                 <div className="form-check form-check-inline">
//                   <input type="radio" className="form-check-input" id="female" name="gender" value="Female" checked={gender === "Female"} onChange={(e) => setGender(e.target.value)} />
//                   <label className="form-check-label" htmlFor="female">Female</label>
//                 </div>
//               </div>
//             </div>

//             {renderInput(faPhone, "Phone Number", phoneNumber, setPhoneNumber,'number')}
//             {renderInput(faPhone, "Emergency Contact", emergencyContact, setEmergencyContact,'number')}
//             {renderInput(faUserFriends, "Reporting Manager", reportingManager, setReportingManager,'text')}
//             {renderInput(faClock, "Probation Period", probationPeriod, setProbationPeriod,'number')}
//             {renderInput(faIdCard, "Aadhar Number", aadharNumber, setAadharNumber,'number')}
//             {renderInput(faEnvelope, "Email", email, setEmail, "email")}
//             {renderInput(faUserTie, "Employee Type", employeeType, setEmployeeType,'text')}
//             {renderInput(faHome, "Address Line 1", addressLine1, setAddressLine1,'text')}
//             {renderInput(faHome, "Address Line 2", addressLine2, setAddressLine2,'text')}
//             {renderInput(faHome, "City", city, setCity,'text')}
//             {renderInput(faHome, "State", state, setState,'text')}
//             {renderInput(faHome, "Zip Code", zipCode, setZipCode,'number')}
//             {renderInput(faMoneyBill, "Salary", salary, setSalary,'number')}
//             {renderInput(faIdBadge, "Employee ID", employeeID, setEmployeeId,'number')}
//           </div>

//           <div className="text-center">
//             <button type="submit" className="btn btn-success px-4 mt-3">Add Employee</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser, faCalendar, faPhone, faEnvelope, faIdCard,
  faBuilding, faUserTie, faVenusMars, faClock,
  faHome, faMoneyBill, faIdBadge, faUserFriends
} from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from 'react-bootstrap';
import { AuthContext } from "../AuthContext";

export default function AddEmployee() {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [companyData, setCompanyData] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const {token} = useContext(AuthContext)

  const [employee, setEmployee] = useState({
    firstName: "", lastName: "", fatherName: "", birthDate: "", hireDate: "", gender: "",
    phoneNumber: "", emergencyContact: "", reportingManager: "", probationPeriod: "", aadharNumber: "",
    email: "", employeeType: "", addressLine1: "", addressLine2: "", city: "", state: "",
    zipCode: "", salary: "", employeeID: ""
  });

  useEffect(() => {
    fetchCompanies();
  }, []);
  const fetchCompanies = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/companies", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        
        },
        credentials: "include", // ✅ ensures cookies are sent
      });
      const data = await response.json();
      setCompanies(data.data);
    } catch (err) {
      console.error("Error fetching companies:", err);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCompany || !employee.firstName) {
      return alert("Please select a company and enter a name.");
    }

    const payload = {
      ...employee,
      companyId: companyData.id
    };

    try {
      const res = await fetch("http://localhost:8080/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json",
         },
         credentials: "include", // ✅ ensures cookies are sent
          body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Employee added successfully");
        setEmployee({
          firstName: "", lastName: "", fatherName: "", birthDate: "", hireDate: "", gender: "",
          phoneNumber: "", emergencyContact: "", reportingManager: "", probationPeriod: "", aadharNumber: "",
          email: "", employeeType: "", addressLine1: "", addressLine2: "", city: "", state: "",
          zipCode: "", salary: "", employeeID: ""
        });
        setSelectedCompany("");
        setCompanyData(null);
      } else {
        alert("Error adding employee");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error adding employee");
    }
  };

  const renderInput = (icon, placeholder, key, type = "text") => (
    <div className="col-md-6 mb-3">
      <div className="input-group">
        <span className="input-group-text bg-light"><FontAwesomeIcon icon={icon} /></span>
        <input
          type={type}
          className="form-control"
          placeholder={placeholder}
          value={employee[key]}
          onChange={(e) => setEmployee({ ...employee, [key]: e.target.value })}
        />
      </div>
    </div>
  );

  return (
    <div className="container my-4">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Add Employee</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="form-label"><FontAwesomeIcon icon={faBuilding} /> Select Company</label>
            <div>
              <Button variant="outline-secondary" className="w-100 text-start" onClick={() => setShowCompanyModal(true)}>
                {selectedCompany || "Select a company"}
              </Button>
            </div>
          </div>

          <Modal show={showCompanyModal} onHide={() => setShowCompanyModal(false)} centered scrollable>
            <Modal.Header closeButton>
              <Modal.Title>Select Company</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {companies.map((c, i) => (
                <Button
                  key={i}
                  variant="light"
                  className="w-100 mb-2 text-start"
                  onClick={() => {
                    setSelectedCompany(c.companyName);
                    setCompanyData(c);
                    setShowCompanyModal(false);
                  }}
                >
                  {c.companyName}
                </Button>
              ))}
            </Modal.Body>
          </Modal>

          <div className="row">
            {renderInput(faUser, "First Name", "firstName")}
            {renderInput(faUser, "Last Name", "lastName")}
            {renderInput(faUser, "Father Name", "fatherName")}
            {renderInput(faCalendar, "Birth Date", "birthDate", "date")}
            {renderInput(faCalendar, "Hire Date", "hireDate", "date")}

            <div className="col-md-6 mb-3">
              <label className="form-label"><FontAwesomeIcon icon={faVenusMars} /> Gender</label>
              <div>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" id="male" name="gender" value="Male"
                    checked={employee.gender === "Male"}
                    onChange={(e) => setEmployee({ ...employee, gender: e.target.value })} />
                  <label className="form-check-label" htmlFor="male">Male</label>
                </div>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" id="female" name="gender" value="Female"
                    checked={employee.gender === "Female"}
                    onChange={(e) => setEmployee({ ...employee, gender: e.target.value })} />
                  <label className="form-check-label" htmlFor="female">Female</label>
                </div>
              </div>
            </div>

            {renderInput(faPhone, "Phone Number", "phoneNumber", "number")}
            {renderInput(faPhone, "Emergency Contact", "emergencyContact", "number")}
            {renderInput(faUserFriends, "Reporting Manager", "reportingManager")}
            {renderInput(faClock, "Probation Period", "probationPeriod", "number")}
            {renderInput(faIdCard, "Aadhar Number", "aadharNumber", "number")}
            {renderInput(faEnvelope, "Email", "email", "email")}
            {renderInput(faUserTie, "Employee Type", "employeeType")}
            {renderInput(faHome, "Address Line 1", "addressLine1")}
            {renderInput(faHome, "Address Line 2", "addressLine2")}
            {renderInput(faHome, "City", "city")}
            {renderInput(faHome, "State", "state")}
            {renderInput(faHome, "Zip Code", "zipCode", "number")}
            {renderInput(faMoneyBill, "Salary", "salary", "number")}
            {renderInput(faIdBadge, "Employee ID", "employeeID", "number")}
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-success px-4 mt-3">Add Employee</button>
          </div>
        </form>
      </div>
    </div>
  );
}
