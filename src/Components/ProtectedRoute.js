import { Navigate } from "react-router-dom";

const RoleBasedRoute = ({ isAuthenticated, allowedRoles, userRole, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleBasedRoute;
