// import { Navigate } from "react-router-dom";

// const RoleBasedRoute = ({ isAuthenticated, allowedRoles, userRole, children }) => {
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   if (!allowedRoles.includes(userRole)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return children;
// };

// export default RoleBasedRoute;
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const RoleBasedRoute = ({ allowedRoles, children }) => {
  const { token, roles } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const hasAccess = roles.some((role) => allowedRoles.includes(role));

  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleBasedRoute;
