import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Services from "./Components/Services";
import Register from "./Components/Register";
import Contact from "./Components/Contact";
import Dashboard from "./Components/Dashboard";
import PayrollProcess from "./Components/payroll";
import EmployeeInfo from "./Components/Employee";
import ProcessPayroll from "./Components/Payroll/ProcessPayroll";
import PayrollStatement from "./Components/Payroll/PayrollStatement";
import AddCompany from "./Components/Payroll/Addcompany";
import AddEmployee from "./Components/Payroll/AddEmployee";
import EmployeeDetails from "./Components/Employee/EmployeeDetails";
import Payslip from "./Components/Employee/PaySlip";
import Admin from "./Components/Employee/Admin";
import './App.css'; // Import the CSS file

export default function App() {
  return (
    <BrowserRouter basename="/">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
     

        {/* Protected Dashboard with nested routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="payroll">
            <Route index element={<PayrollProcess />} />
            <Route path="uploadExcelProcess" element={<ProcessPayroll />}/>
            <Route path="payrollStatement" element={<PayrollStatement />} />
            <Route path="addCompany" element={<AddCompany />} />
            <Route path="addEmployee" element={<AddEmployee />} />
          </Route>

          <Route path="employee" element={<EmployeeInfo />} />
          <Route path="employee">
            <Route path="employeedetails" element={<EmployeeDetails/>} />
            <Route path="payslip" element={<Payslip />}/>
            <Route path="admin" element={<Admin />}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
