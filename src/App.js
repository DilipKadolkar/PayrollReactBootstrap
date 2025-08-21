import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Services from "./Components/Services";
import Register from "./Components/Register";
import Contact from "./Components/Contact";
import Dashboard from "./Components/Dashboard";
import Payroll from "./Components/payroll";
import EmployeeInfo from "./Components/Employee";
import ProcessPayroll from "./Components/Payroll/ProcessPayroll";
import PayrollStatement from "./Components/Payroll/PayrollStatement";
import AddCompany from "./Components/Payroll/Addcompany";
import AddEmployee from "./Components/Payroll/AddEmployee";
import EmployeeDetails from "./Components/Employee/EmployeeDetails";
import Payslip from "./Components/Employee/PaySlip";
import EmployeeAttendance from "./Components/Payroll/EmployeeAttendance";
import EmployeeOvertime from "./Components/Payroll/EmployeeOvertime";

import Admin from "./Components/Employee/Admin";
import "./App.css"; // Import the CSS file
import RoleBasedRoute from "./Components/ProtectedRoute";

export default function App() {
  const isAuthenticated = false;
  const userRole = "SUPER_ADMIN";
  return (
    <BrowserRouter basename="/">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="payroll">
            <Route
              path="payrollStatement"
              element={
                <RoleBasedRoute
                  isAuthenticated={isAuthenticated}
                  allowedRoles={["ADMIN", "SUPER_ADMIN"]}
                  userRole={userRole}
                >
                  <PayrollStatement />
                </RoleBasedRoute>
              }
            />

            <Route
              path=""
              element={
                <RoleBasedRoute
                  isAuthenticated={isAuthenticated}
                  allowedRoles={["ADMIN", "SUPER_ADMIN","USER"]}
                  userRole={userRole}
                >
                  <Payroll />
                </RoleBasedRoute>
              }
            />

            
      
            <Route
              path="uploadExcelProcess"
              element={
                <RoleBasedRoute
                  isAuthenticated={isAuthenticated}
                  allowedRoles={["SUPER_ADMIN","ADMIN"]}
                  userRole={userRole}
                >
                  <ProcessPayroll />
                </RoleBasedRoute>
              }
            />

            <Route
              path="addCompany"
              element={
                <RoleBasedRoute
                  isAuthenticated={isAuthenticated}
                  allowedRoles={["SUPER_ADMIN"]}
                  userRole={userRole}
                >
                  <AddCompany />
                </RoleBasedRoute>
              }
            />
            <Route
              path="addEmployee"
              element={
                <RoleBasedRoute
                  isAuthenticated={isAuthenticated}
                  allowedRoles={["ADMIN"]}
                  userRole={userRole}
                >
                  <AddEmployee />
                </RoleBasedRoute>
              }
            />
            <Route
            index
            path="attendance"
                          element={
                <RoleBasedRoute
                  isAuthenticated={isAuthenticated}
                  allowedRoles={["ADMIN", "SUPER_ADMIN", "USER"]}
                  userRole={userRole}
                >
                  <EmployeeAttendance />
                </RoleBasedRoute>
              }
            />
            <Route
              path="overtime"
              element={
                <RoleBasedRoute
                  isAuthenticated={isAuthenticated}
                  allowedRoles={["ADMIN", "SUPER_ADMIN", "USER"]}

                  userRole={userRole}
                >
                  <EmployeeOvertime />
                </RoleBasedRoute>
              }
            />
          </Route>


          <Route path="employee">
          <Route
              path=""
              element={
                <RoleBasedRoute
                  isAuthenticated={isAuthenticated}
                  allowedRoles={["ADMIN", "SUPER_ADMIN", "USER"]}
                  userRole={userRole}
                >
                  <EmployeeInfo />
                </RoleBasedRoute>
              }
            />
            <Route
              path="employeedetails"
              element={
                <RoleBasedRoute
                  isAuthenticated={isAuthenticated}
                  allowedRoles={["ADMIN", "SUPER_ADMIN", "USER"]}
                  userRole={userRole}
                >
                  <EmployeeDetails />
                </RoleBasedRoute>
              }
            />
            <Route
              path="payslip"
              element={
                <RoleBasedRoute
                  isAuthenticated={isAuthenticated}
                  allowedRoles={["ADMIN", "USER"]}
                  userRole={userRole}
                >
                  <Payslip />
                </RoleBasedRoute>
              }
            />
            <Route
              path="admin"
              element={
                <RoleBasedRoute
                  isAuthenticated={isAuthenticated}
                  allowedRoles={["ADMIN"]}
                  userRole={userRole}
                >
                  <Admin />
                </RoleBasedRoute>
              }
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


