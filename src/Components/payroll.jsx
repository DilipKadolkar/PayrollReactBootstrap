
import React, { useEffect, useState } from "react";
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
import Card from "./Card";
import { Outlet, useNavigate } from "react-router-dom";

const cards = [
  { title: "Process Payroll", icon: faFileInvoiceDollar, path: "/dashboard/payroll/uploadExcelProcess" },
  { title: "Payroll Statement", icon: faChartLine, path: "/dashboard/payroll/payrollStatement" },
  { title: "Add Company", icon: faBuilding, path: "/dashboard/payroll/addCompany" },
  // { title: "Add Employee", icon: faUserPlus, path: "/dashboard/payroll/addEmployee" },
  { title: "Add Admin", icon: faUserPlus, path: "/dashboard/payroll/addadmin" },
  // { title: "Tax Information", icon: faFileInvoiceDollar },
  // { title: "Employee Benefits", icon: faHeartbeat },
  // { title: "Payroll Summary", icon: faChartPie },
  { title: "Overtime Details", icon: faClock, path: "/dashboard/payroll/overtime" },
  // { title: "Leave Management", icon: faCalendarAlt },
  { title: "Employee Attendance", icon: faCalendarDay, path: "/dashboard/payroll/attendance" },
  // { title: "Performance Review", icon: faPoll },
  // { title: "Training Programs", icon: faGraduationCap },
  // { title: "Health Insurance", icon: faHeartbeat },
  // { title: "Retirement Plans", icon: faPiggyBank },
  // { title: "Expense Reimbursement", icon: faMoneyCheckAlt },
  // { title: "Travel Allowance", icon: faPlane },
  // { title: "Bonus Distribution", icon: faGift },
  // { title: "Holiday Schedule", icon: faCalendar },
  // { title: "Work From Home", icon: faHome },
  // { title: "Employee Directory", icon: faAddressBook },
  // { title: "Job Openings", icon: faBullhorn },
  // { title: "Company Policies", icon: faBook },
  // { title: "Team Building", icon: faUsers },
  // { title: "Project Management", icon: faTasks },
  // { title: "Client Invoices", icon: faFileInvoice },
  // { title: "Vendor Payments", icon: faMoneyBillWave },
  // { title: "Budget Planning", icon: faChartPie },
  // { title: "Financial Reports", icon: faClipboardList },
  // { title: "Audit Logs", icon: faShieldAlt },
  // { title: "Compliance Check", icon: faLaptop },
  // { title: "Risk Management", icon: faBoxOpen },
  // { title: "IT Support", icon: faCalendarCheck },
  // { title: "Office Supplies", icon: faCalendarDay },
  // { title: "Meeting Schedule", icon: faChalkboardTeacher },
  // { title: "Event Planning", icon: faPoll },
  // { title: "Corporate Training", icon: faCommentDots },
  // { title: "Employee Surveys", icon: faUserGraduate },
  // { title: "Feedback System", icon: faArrowUp },
  // { title: "Career Development", icon: faMoneyBill },
  // { title: "Promotion Criteria", icon: faSignOutAlt },
];

const adminCard = [
  { title: "Process Payroll", icon: faFileInvoiceDollar, path: "/dashboard/payroll/uploadExcelProcess" },
  { title: "Payroll Statement", icon: faChartLine, path: "/dashboard/payroll/payrollStatement" },
  { title: "Add Employee", icon: faUserPlus, path: "/dashboard/payroll/addEmployee" },
  { title: "Overtime Details", icon: faClock, path: "/dashboard/payroll/overtime" },
  { title: "Employee Attendance", icon: faCalendarDay, path: "/dashboard/payroll/attendance" },
];
const employeeCard = [
  { title: "Overtime Details", icon: faClock, path: "/dashboard/payroll/overtime" },
  { title: "Employee Attendance", icon: faCalendarDay, path: "/dashboard/payroll/attendance" },
];

export default function Payroll() {
  const navigate = useNavigate();
  const [cardArray , setCardArray] = useState([])

  useEffect(()=>{
    const role = "superadmin"
    if(role === "superadmin"){
      setCardArray(cards)
    }else if(role === "admin"){
      setCardArray(adminCard)
    }else{
      setCardArray(employeeCard)
    }
  })
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
          {cardArray.map((card, index) => (
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
