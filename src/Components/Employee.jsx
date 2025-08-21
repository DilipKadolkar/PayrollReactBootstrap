import React from "react";
import {
  faFileInvoiceDollar,
  faChartLine,
  faBuilding,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import Card from "./Card";
import { Outlet, useNavigate } from "react-router-dom";

const cards = [
  { title: "Employee Details", icon: faFileInvoiceDollar, path: "/dashboard/employee/employeedetails" },
  { title: "Admin", icon: faChartLine, path: "/dashboard/employee/admin" },
  { title: "Payslip", icon: faBuilding, path: "/dashboard/employee/payslip" },
];

export default function EmployeeInfo() {
  const navigate = useNavigate();

  const handleCardClick = (card) => {
    if (card.path) {
      navigate(card.path);
    } else {
      alert(`Clicked: ${card.title}`);
    }
  };

  return (
    <>
      <div className="container py-4">
        <div className="row g-4">
          {cards.map((card, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <Card
                title={card.title}
                icon={card.icon}
                style={{ backgroundColor: "#f9f9f9", height: "200px" }}
                onClick={() => handleCardClick(card)}
              />
            </div>
          ))}
        </div>
      </div>
      <Outlet />
    </>
  );
}
