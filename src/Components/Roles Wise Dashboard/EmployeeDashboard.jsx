

import React from 'react';
import Card from '../Card'; 
import { Outlet, useNavigate } from "react-router-dom";
import {
    faUserPlus,
    faDollarSign,
    faBuilding,
    faFileInvoiceDollar,
    faBriefcase,
    faClock,
    faCalendarAlt,
    faChartLine,
    faGraduationCap,
    faHeartbeat,
    faPiggyBank,
    faMoneyCheckAlt,
    faPlane,
    faGift,
    faCalendar,
    faHome,
    faAddressBook,
    faBullhorn,
    faBook,
    faUsers,
    faTasks,
    faFileInvoice,
    faMoneyBillWave,
    faChartPie,
    faClipboardList,
    faShieldAlt,
    faLaptop,
    faBoxOpen,
    faCalendarCheck,
    faCalendarDay,
    faChalkboardTeacher,
    faPoll,
    faCommentDots,
    faUserGraduate,
    faArrowUp,
    faMoneyBill,
    faSignOutAlt,
  } from "@fortawesome/free-solid-svg-icons";
const cardTitles = [
    'Employee Details', 'Payslip', 'Overtime Details', 'Employee Attendance'
];

const icons = [
  faFileInvoiceDollar,
  faChartLine,
  faBuilding,
  faUserPlus,
  faFileInvoiceDollar,
  faHeartbeat,
  faChartPie,
  faClock,
  faCalendarAlt,
  faCalendarDay,
  faPoll,
  faGraduationCap,
  faHeartbeat,
  faPiggyBank,
  faMoneyCheckAlt,
  faPlane,
  faGift,
  faCalendar,
  faHome,
  faAddressBook,
  faBullhorn,
  faBook,
  faUsers,
  faTasks,
  faFileInvoice,
  faMoneyBillWave,
  faChartPie,
  faClipboardList,
  faShieldAlt,
  faLaptop,
  faBoxOpen,
  faCalendarCheck,
  faCalendarDay,
  faChalkboardTeacher,
  faPoll,
  faCommentDots,
  faUserGraduate,
  faArrowUp,
  faMoneyBill,
  faSignOutAlt,
];

const EmployeeDashboard = () => {
    const navigate = useNavigate();
    const handleCardClick = (title) => {
        switch (title) {
            case "Employee Details":
                navigate("/dashboard/employee/employeedetails");
                break;
            case "Employee Attendance":
                navigate("/dashboard/payroll/attendance");
                break;  
            case "Overtime Details":
                    navigate("/dashboard/payroll/overtime");
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

export default EmployeeDashboard