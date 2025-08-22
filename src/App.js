import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Services from "./Components/Services";
import Register from "./Components/Register";
import Contact from "./Components/Contact";

import RoleBasedRoute from "./Components/ProtectedRoute";
import routesConfig from "./config/routesConfig";

export default function App() {
  const isAuthenticated = true;
  const userRole = "SUPER_ADMIN";

  const renderRoutes = (routes) =>
    routes.map(({ path, element, allowedRoles, children, index }) => (
      <Route
        key={path || "index"}
        path={path}
        index={index}
        element={
          allowedRoles ? (
            <RoleBasedRoute
              isAuthenticated={isAuthenticated}
              allowedRoles={allowedRoles}
              userRole={userRole}
            >
              {element}
            </RoleBasedRoute>
          ) : (
            element
          )
        }
      >
        {children && renderRoutes(children)}
      </Route>
    ));
  return (
    <BrowserRouter basename="/">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />

       
        {renderRoutes(routesConfig)}
      </Routes>
    </BrowserRouter>
  );
}


