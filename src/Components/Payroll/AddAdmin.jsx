import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { AuthContext } from "../AuthContext";

export default function AddAdmin() {
  const [adminemail, setAdminEmail] = useState("");
  const [adminpassword, setAdminPassword] = useState("");
    const [role , setRole] = useState("")
   const [selectedCompany, setSelectedCompany] = useState("");
    const [companyData, setCompanyData] = useState(null);
    const [companies, setCompanies] = useState([]);
    const [showCompanyModal, setShowCompanyModal] = useState(false);

    const {token} = useContext(AuthContext)
 useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
        const response = await fetch("http://localhost:8080/api/companies", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // ✅ add JWT here
            },
          });
      const data = await response.json();
      setCompanies(data.data);
    } catch (err) {
      console.error("Error fetching companies:", err);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (selectedCompany) {
      try {
        const response = await fetch(`http://localhost:8080/createadmin/${selectedCompany}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ add JWT here
          },
          body: JSON.stringify({ adminEmail : adminemail , password : adminpassword,role : role}),
        });
        
        if (response.ok) {
          alert("Admin added successfully");
          setAdminEmail("");
          setAdminPassword("")
        } else {
          alert("Error adding Admin");
        }
      } catch (error) {
        console.error("Error adding Admin:", error);
        alert("Error adding Admin");
      }
    } else {
      alert("Please select a company name");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center py-5" > 
      <div className="card shadow-lg w-100" style={{ maxWidth: "500px" }}>
        <div className="card-body p-4">
          <h3 className="card-title text-center mb-4">Add Admin</h3>
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

            <div className="mb-3 d-flex flex-column gap-4">
              <input
                type="text"
                className="form-control"
                placeholder="Enter admin email"
                value={adminemail}
                onChange={(e) => setAdminEmail(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Enter admin password"
                value={adminpassword}
                onChange={(e) => setAdminPassword(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Enter Role "
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-dark w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
