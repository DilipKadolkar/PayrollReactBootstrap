// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Container,
//   Row,
//   Col,
//   Form,
//   Button,
//   Spinner,
//   Alert,
//   Card
// } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUpload, faBuilding, faFileExcel } from '@fortawesome/free-solid-svg-icons';

// export default function ProcessPayroll() {
//   const [file, setFile] = useState(null);
//   const [selectedCompany, setSelectedCompany] = useState('');
//   const [companies, setCompanies] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const fileInputRef = useRef(null);
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

//   const handleFileChange = (event) => {
//     const selected = event.target.files[0];
//     if (selected) {
//       setFile(selected);
//     }
//   };

//   const handleCompanyChange = (event) => {
//     setSelectedCompany(event.target.value);
//     setFile(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const handleUpload = async () => {
//     if (file && selectedCompany) {
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('company', selectedCompany);

//       try {
//         setLoading(true);
//         const response = await fetch('http://localhost:8080/upload', {
//           method: 'POST',
//           body: formData,
//         });

//         if (response.ok) {
//           alert(`File uploaded successfully for ${selectedCompany}`);
//           navigate('/loggedInPage/payrollProcess');
//         } else {
//           const errorText = await response.text();
//           alert(`Upload failed: ${errorText || response.statusText}`);
//         }
//       } catch (error) {
//         console.error('Upload error:', error);
//         alert('Error uploading file.');
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       alert('Please select a company and upload a file.');
//     }
//   };

//   return (
//     <Container className="py-5">
//       <Row className="justify-content-center">
//         <Col xs={12} sm={10} md={8} lg={6}>
//           <Card className="shadow-lg p-4">
//             <Card.Body>
//               <div className="text-center mb-4">
//                 <h4>
//                   <FontAwesomeIcon icon={faBuilding} className="me-2" />
//                   Upload Excel for Company
//                 </h4>
//               </div>

//               {/* Company Dropdown */}
//               <Form.Group controlId="companySelect" className="mb-3">
//                 <Form.Label>Select Company</Form.Label>
//                 <Form.Select
//                   value={selectedCompany}
//                   onChange={handleCompanyChange}
//                 >
//                   <option value="">-- Select a company --</option>
//                   {companies.map((company, index) => (
//                     <option key={index} value={company.companyName} >
//                       {company.companyName}
//                     </option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>

//               {/* File Upload */}
//               {selectedCompany && (
//                 <Form.Group controlId="fileUpload" className="mb-3">
//                   <Form.Label>Upload Excel File</Form.Label>
//                   <Form.Control
//                     type="file"
//                     accept=".xlsx, .xls"
//                     onChange={handleFileChange}
//                     ref={fileInputRef}
//                   />
//                 </Form.Group>
//               )}

//               {/* Uploaded File Info & Upload Button */}
//               {file && (
//                 <div className="text-center mt-3">
//                   <Alert variant="info" className="text-break">
//                     <FontAwesomeIcon icon={faFileExcel} className="me-2" />
//                     Selected File: <strong>{file.name}</strong>
//                   </Alert>
//                   <Button
//                     variant="primary"
//                     onClick={handleUpload}
//                     disabled={loading}
//                     className="w-100"
//                   >
//                     {loading ? (
//                       <>
//                         <Spinner animation="border" size="sm" className="me-2" />
//                         Uploading...
//                       </>
//                     ) : (
//                       <>
//                         <FontAwesomeIcon icon={faUpload} className="me-2" />
//                         Upload to Server
//                       </>
//                     )}
//                   </Button>
//                 </div>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// }
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Alert,
  Card,
  Modal
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faBuilding, faFileExcel } from '@fortawesome/free-solid-svg-icons';

export default function ProcessPayroll() {
  const [file, setFile] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const fileInputRef = useRef(null);
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

  const handleFileChange = (event) => {
    const selected = event.target.files[0];
    if (selected) {
      setFile(selected);
    }
  };

  const handleCompanySelect = (companyName) => {
    setSelectedCompany(companyName);
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setShowCompanyModal(false);
  };

  const handleUpload = async () => {
    if (file && selectedCompany) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('company', selectedCompany);

      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          alert(`File uploaded successfully for ${selectedCompany}`);
          navigate('/loggedInPage/payrollProcess');
        } else {
          const errorText = await response.text();
          alert(`Upload failed: ${errorText || response.statusText}`);
        }
      } catch (error) {
        console.error('Upload error:', error);
        alert('Error uploading file.');
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please select a company and upload a file.');
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className="shadow-lg p-4">
            <Card.Body>
              <div className="text-center mb-4">
                <h4>
                  <FontAwesomeIcon icon={faBuilding} className="me-2" />
                  Upload Excel for Company
                </h4>
              </div>

              {/* Company Modal Trigger */}
              <Form.Group controlId="companyModal" className="mb-3">
                <Form.Label>Select Company</Form.Label>
                <Button variant="outline-secondary" className="w-100" onClick={() => setShowCompanyModal(true)}>
                  {selectedCompany || 'Select a company'}
                </Button>
              </Form.Group>

              {/* Company Modal */}
              <Modal show={showCompanyModal} onHide={() => setShowCompanyModal(false)} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Select Company</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {companies.map((company, index) => (
                    <Button
                      key={index}
                      variant="light"
                      className="w-100 text-start mb-2"
                      onClick={() => handleCompanySelect(company.companyName)}
                    >
                      {company.companyName}
                    </Button>
                  ))}
                </Modal.Body>
              </Modal>

              {/* File Upload */}
              {selectedCompany && (
                <Form.Group controlId="fileUpload" className="mb-3">
                  <Form.Label>Upload Excel File</Form.Label>
                  <Form.Control
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                  />
                </Form.Group>
              )}

              {/* Uploaded File Info & Upload Button */}
              {file && (
                <div className="text-center mt-3">
                  <Alert variant="info" className="text-break">
                    <FontAwesomeIcon icon={faFileExcel} className="me-2" />
                    Selected File: <strong>{file.name}</strong>
                  </Alert>
                  <Button
                    variant="primary"
                    onClick={handleUpload}
                    disabled={loading}
                    className="w-100"
                  >
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faUpload} className="me-2" />
                        Upload to Server
                      </>
                    )}
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
