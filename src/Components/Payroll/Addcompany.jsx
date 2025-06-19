import React, { useState } from "react";

export default function AddCompany() {
  const [newCompanyName, setNewCompanyName] = useState("");
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (newCompanyName) {
      try {
        const response = await fetch(`http://localhost:8080/api/companies`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ company_name: newCompanyName }),
        });
        
        if (response.ok) {
          alert("Company added successfully");
          setNewCompanyName("");
        } else {
          alert("Error adding company");
        }
      } catch (error) {
        console.error("Error adding company:", error);
        alert("Error adding company");
      }
    } else {
      alert("Please enter a company name");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center py-5" > 
      <div className="card shadow-lg w-100" style={{ maxWidth: "500px" }}>
        <div className="card-body p-4">
          <h3 className="card-title text-center mb-4">Add Company</h3>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter company name"
                value={newCompanyName}
                onChange={(e) => setNewCompanyName(e.target.value)}
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
