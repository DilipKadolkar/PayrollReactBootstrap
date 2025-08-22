// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Navbar from "./Components/Navbar";
// import Login from "./Components/Login";
// import Home from "./Components/Home";
// import Services from "./Components/Services";
// import Register from "./Components/Register";
// import Contact from "./Components/Contact";

// import RoleBasedRoute from "./Components/ProtectedRoute";
// import routesConfig from "./config/routesConfig";

// export default function App() {
//   const isAuthenticated = true;
//   const userRole = "SUPER_ADMIN";

//   const renderRoutes = (routes) =>
//     routes.map(({ path, element, allowedRoles, children, index }) => (
//       <Route
//         key={path || "index"}
//         path={path}
//         index={index}
//         element={
//           allowedRoles ? (
//             <RoleBasedRoute
//               isAuthenticated={isAuthenticated}
//               allowedRoles={allowedRoles}
//               userRole={userRole}
//             >
//               {element}
//             </RoleBasedRoute>
//           ) : (
//             element
//           )
//         }
//       >
//         {children && renderRoutes(children)}
//       </Route>
//     ));
//   return (
//     <BrowserRouter basename="/">
//       <Navbar />
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/services" element={<Services />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/contact" element={<Contact />} />

       
//         {renderRoutes(routesConfig)}
//       </Routes>
//     </BrowserRouter>
//   );
// }


import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Services from "./Components/Services";
import Register from "./Components/Register";
import Contact from "./Components/Contact";
import routesConfig from "./config/routesConfig";
import { AuthProvider } from "./Components/AuthContext";
import RoleBasedRoute from "./Components/ProtectedRoute";
export default function App() {
  const renderRoutes = (routes) =>
    routes.map(({ path, element, allowedRoles, children, index }) => (
      <Route
        key={path || "index"}
        path={path}
        index={index}
        element={
          allowedRoles ? (
            <RoleBasedRoute allowedRoles={allowedRoles}>{element}</RoleBasedRoute>
          ) : (
            element
          )
        }
      >
        {children && renderRoutes(children)}
      </Route>
    ));

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected routes */}
          {renderRoutes(routesConfig)}

          {/* Unauthorized page */}
          <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
