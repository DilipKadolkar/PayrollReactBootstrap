// import Dashboard from "../Components/Dashboard";
// import PayrollStatement from "../Components/Payroll/PayrollStatement";
// import ProcessPayroll from "../Components/Payroll/ProcessPayroll";
// import AddCompany from "../Components/Payroll/Addcompany";
// import AddEmployee from "../Components/Payroll/AddEmployee";
// import EmployeeAttendance from "../Components/Payroll/EmployeeAttendance";
// import EmployeeOvertime from "../Components/Payroll/EmployeeOvertime";

// import EmployeeInfo from "../Components/Employee";
// import EmployeeDetails from "../Components/Employee/EmployeeDetails";
// import Payslip from "../Components/Employee/PaySlip";
// import Admin from "../Components/Employee/Admin";
// import Payroll from "../Components/payroll";
// import AddAdmin from "../Components/Payroll/AddAdmin";

// const routesConfig = [
//   {
//     path: "/dashboard",
//     element: <Dashboard />,
//     children: [
//       {
//         path: "payroll",
//         children: [
//           {
//             path: "payrollStatement",
//             element: <PayrollStatement />,
//             allowedRoles: ["ADMIN", "SUPER_ADMIN"],
//           },
//           {
//             path: "",
//             element: <Payroll />,
//             allowedRoles: ["ADMIN", "SUPER_ADMIN", "USER"],
//           },
//           {
//             path: "uploadExcelProcess",
//             element: <ProcessPayroll />,
//             allowedRoles: ["SUPER_ADMIN", "ADMIN"],
//           },
//           {
//             path: "addCompany",
//             element: <AddCompany />,
//             allowedRoles: ["SUPER_ADMIN"],
//           },
//           {
//             path: "addEmployee",
//             element: <AddEmployee />,
//             allowedRoles: ["ADMIN"],
//           },
//           {
//             index: true,
//             path: "attendance",
//             element: <EmployeeAttendance />,
//             allowedRoles: ["ADMIN", "SUPER_ADMIN", "USER"],
//           },
//           {
//             path: "overtime",
//             element: <EmployeeOvertime />,
//             allowedRoles: ["ADMIN", "SUPER_ADMIN", "USER"],
//           },
          
//           {
//             path: "addadmin",
//             element: <AddAdmin />,
//             allowedRoles: ["SUPER_ADMIN"],
//           },
//         ],
//       },
//       {
//         path: "employee",
//         children: [
//           {
//             path: "",
//             element: <EmployeeInfo />,
//             allowedRoles: ["ADMIN", "SUPER_ADMIN", "USER"],
//           },
//           {
//             path: "employeedetails",
//             element: <EmployeeDetails />,
//             allowedRoles: ["ADMIN", "SUPER_ADMIN", "USER"],
//           },
//           {
//             path: "payslip",
//             element: <Payslip />,
//             allowedRoles: ["ADMIN", "USER"],
//           },
//           {
//             path: "admin",
//             element: <Admin />,
//             allowedRoles: ["ADMIN"],
//           },
//         ],
//       },
//     ],
//   },
// ];

// export default routesConfig;
import Dashboard from "../Components/Dashboard";
import PayrollStatement from "../Components/Payroll/PayrollStatement";
import ProcessPayroll from "../Components/Payroll/ProcessPayroll";
import AddCompany from "../Components/Payroll/Addcompany";
import AddEmployee from "../Components/Payroll/AddEmployee";
import EmployeeAttendance from "../Components/Payroll/EmployeeAttendance";
import EmployeeOvertime from "../Components/Payroll/EmployeeOvertime";
import EmployeeInfo from "../Components/Employee";
import EmployeeDetails from "../Components/Employee/EmployeeDetails";
import Payslip from "../Components/Employee/PaySlip";
import Admin from "../Components/Employee/Admin";
import Payroll from "../Components/payroll";
import AddAdmin from "../Components/Payroll/AddAdmin";
import ShiftScheduler from "../Components/Payroll/ShiftScheduler";
import EmployeeShifts from "../Components/Employee/EmployeeShifts";
import Profile from "../Components/Payroll/Profile";

const routesConfig = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "payroll",
        children: [
          { path: "payrollStatement", element: <PayrollStatement />, allowedRoles: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"] },
          { path: "", element: <Payroll />, allowedRoles: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN", "ROLE_USER"] },
          { path: "uploadExcelProcess", element: <ProcessPayroll />, allowedRoles: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"]  },
          { path: "addCompany", element: <AddCompany />, allowedRoles: ["ROLE_SUPER_ADMIN"] },
          { path: "addEmployee", element: <AddEmployee />, allowedRoles: ["ROLE_ADMIN"] },
          { index: true, path: "attendance", element: <EmployeeAttendance />, allowedRoles: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN", "ROLE_USER"] },
          { path: "overtime", element: <EmployeeOvertime />, allowedRoles: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN", "ROLE_USER"] },
          { path: "addadmin", element: <AddAdmin />, allowedRoles: ["ROLE_SUPER_ADMIN"] },
          { path: "shiftscheduler", element: <ShiftScheduler />, allowedRoles: ["ROLE_ADMIN"] },
          { path: "profile", element: <Profile />, allowedRoles: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN", "ROLE_USER"] },
        ],
      },
      {
        path: "employee",
        children: [
          { path: "", element: <EmployeeInfo />, allowedRoles: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN", "ROLE_USER"] },
          { path: "employeedetails", element: <EmployeeDetails />, allowedRoles: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN", "USER"] },
          { path: "payslip", element: <Payslip />, allowedRoles: ["ROLE_ADMIN", "ROLE_USER"] },
          { path: "admin", element: <Admin />, allowedRoles: ["ROLE_ADMIN"] },
          {path: "shifts", element: <EmployeeShifts />, allowedRoles: ["ROLE_ADMIN", "ROLE_USER"] },
        ],
      },
    ],
  },
];

export default routesConfig;
