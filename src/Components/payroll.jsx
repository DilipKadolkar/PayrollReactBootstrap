import React from "react";
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

const cardTitles = [
  "Process Payroll",
  "Payroll Statement",
  "Add Company",
  "Add Employee",
  "Tax Information",
  "Employee Benefits",
  "Payroll Summary",
  "Overtime Details",
  "Leave Management",
  "Employee Attendance",
  "Performance Review",
  "Training Programs",
  "Health Insurance",
  "Retirement Plans",
  "Expense Reimbursement",
  "Travel Allowance",
  "Bonus Distribution",
  "Holiday Schedule",
  "Work From Home",
  "Employee Directory",
  "Job Openings",
  "Company Policies",
  "Team Building",
  "Project Management",
  "Client Invoices",
  "Vendor Payments",
  "Budget Planning",
  "Financial Reports",
  "Audit Logs",
  "Compliance Check",
  "Risk Management",
  "IT Support",
  "Office Supplies",
  "Meeting Schedule",
  "Event Planning",
  "Corporate Training",
  "Employee Surveys",
  "Feedback System",
  "Career Development",
  "Promotion Criteria",
  "Salary Adjustments",
  "Exit Interviews",
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

export default function PayrollProcess() {
  const navigate = useNavigate();
  const handleCardClick = (title) => {
    switch (title) {
      case "Process Payroll":
        navigate("/dashboard/payroll/uploadExcelProcess");
        break;
      case "Payroll Statement":
        navigate("/dashboard/payroll/payrollStatement");
        break;
      case "Add Company":
        navigate("/dashboard/payroll/addCompany");
        break;
      case "Add Employee":
        navigate("/dashboard/payroll/addEmployee");
        break;
      case "Employee Attendance":
        navigate("/dashboard/payroll/attendance");
        break;  
      case "Overtime Details":
        navigate("/dashboard/payroll/overtime");
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
                style={{ backgroundColor: "#f9f9f9", height: "200px" }}
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
