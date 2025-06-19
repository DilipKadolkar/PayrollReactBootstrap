// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function PayrollStatement() {
//   const [selectedCompany, setSelectedCompany] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [companies, setCompanies] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCompanies = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/api/companies");
//         const data = await response.json();
//         setCompanies(data);
//       } catch (error) {
//         console.error("Error fetching companies:", error);
//       }
//     };
//     fetchCompanies();
//   }, []);

//   useEffect(() => {
//     const currentMonth = new Date().toLocaleString("default", { month: "long" });
//     setSelectedMonth(currentMonth);
//   }, []);

//   const handleCompanyChange = (e) => setSelectedCompany(e.target.value);
//   const handleMonthChange = (e) => setSelectedMonth(e.target.value);

//   const handleDownload = async () => {
//     if (!selectedCompany) {
//       alert("Please select a company");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `http://localhost:8080/downloadExcel?company=${selectedCompany}&month=${selectedMonth}`,
//         {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       if (response.ok) {
//         const blob = await response.blob();
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = `${selectedCompany}_Payroll_Statement_${selectedMonth}.xlsx`;
//         document.body.appendChild(a);
//         a.click();
//         a.remove();
//         alert(`File downloaded successfully for ${selectedCompany}`);
//         navigate("/loggedInPage/payrollProcess");
//       } else {
//         alert("Error downloading file");
//       }
//     } catch (error) {
//       console.error("Error downloading file:", error);
//       alert("Error downloading file");
//     }
//   };

//   const months = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];

//   return (
//     <div className="container py-5">
//       <h2 className="text-center mb-4">Payroll Statement</h2>

//       <div className="row g-3 justify-content-center">
//         <div className="col-12 col-md-6">
//           <label className="form-label">Select Company</label>
//           <select
//             className="form-select"
//             value={selectedCompany}
//             onChange={handleCompanyChange}
//           >
//             <option value="">Select a company</option>
//             {companies.map((company, index) => (
//               <option key={index} value={company.companyName}>
//                 {company.companyName}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="col-12 col-md-6">
//           <label className="form-label">Select Month</label>
//           <select
//             className="form-select"
//             value={selectedMonth}
//             onChange={handleMonthChange}
//           >
//             {months.map((month, index) => (
//               <option key={index} value={month}>
//                 {month}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className="text-center mt-4">
//         <button className="btn btn-success px-4" onClick={handleDownload}>
//           Download Excel
//         </button>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PayrollStatement() {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [companies, setCompanies] = useState([]);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [showMonthModal, setShowMonthModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/companies");
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  useEffect(() => {
    const currentMonth = new Date().toLocaleString("default", { month: "long" });
    setSelectedMonth(currentMonth);
  }, []);

  const handleDownload = async () => {
    if (!selectedCompany) {
      alert("Please select a company");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/downloadExcel?company=${selectedCompany}&month=${selectedMonth}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${selectedCompany}_Payroll_Statement_${selectedMonth}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        alert(`File downloaded successfully for ${selectedCompany}`);
        navigate("/loggedInPage/payrollProcess");
      } else {
        alert("Error downloading file");
      }
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Error downloading file");
    }
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Payroll Statement</h2>

      <div className="row g-3 justify-content-center">
        {/* Company Selection */}
        <div className="col-12 col-md-6">
          <label className="form-label">Select Company</label>
          <Button variant="outline-secondary" className="w-100" onClick={() => setShowCompanyModal(true)}>
            {selectedCompany || "Select a company"}
          </Button>

          <Modal show={showCompanyModal} onHide={() => setShowCompanyModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Select Company</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {companies.map((company, index) => (
                <Button
                  key={index}
                  variant="light"
                  className="w-100 text-start my-1"
                  onClick={() => {
                    setSelectedCompany(company.companyName);
                    setShowCompanyModal(false);
                  }}
                >
                  {company.companyName}
                </Button>
              ))}
            </Modal.Body>
          </Modal>
        </div>

        {/* Month Selection */}
        <div className="col-12 col-md-6">
          <label className="form-label">Select Month</label>
          <Button variant="outline-secondary" className="w-100" onClick={() => setShowMonthModal(true)}>
            {selectedMonth || "Select month"}
          </Button>

          <Modal show={showMonthModal} onHide={() => setShowMonthModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Select Month</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {months.map((month, index) => (
                <Button
                  key={index}
                  variant="light"
                  className="w-100 text-start my-1"
                  onClick={() => {
                    setSelectedMonth(month);
                    setShowMonthModal(false);
                  }}
                >
                  {month}
                </Button>
              ))}
            </Modal.Body>
          </Modal>
        </div>
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-success px-4" onClick={handleDownload}>
          Download Excel
        </button>
      </div>
    </div>
  );
}
