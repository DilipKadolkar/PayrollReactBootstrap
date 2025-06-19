import React from 'react';
import { faFileInvoiceDollar, faChartLine, faBuilding, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Card from './Card'; 
import { Outlet, useNavigate } from "react-router-dom";

const cardTitles = [
    'Employee Details', 'Admin', 'Payslip'
];

const icons = [
    faFileInvoiceDollar, faChartLine, faBuilding, faUserPlus
];

export default function EmployeeInfo() {
    const navigate = useNavigate();
    const handleCardClick = (title) => {
        switch (title) {
            case "Employee Details":
                navigate("/dashboard/employee/employeedetails");
                break;
            case "Admin":
                navigate("/dashboard/employee/admin");
                break;
            case "Payslip":
                navigate("/dashboard/employee/payslip");
                break;
            default:
                alert(`Clicked: ${title}`);
        }
      };
    return (

        <>
        <div className="container py-4">
            <div className="row g-4">
                {cardTitles.map((title, index) => (
                    <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <Card
                            title={title}
                            icon={icons[index]}
                            style={{ backgroundColor: '#f9f9f9', height: '200px' }}
                            onClick={() => handleCardClick(title)}
                        />
                    </div>
                ))}
            </div>
        </div>
        <Outlet />
        </>
    );
}
