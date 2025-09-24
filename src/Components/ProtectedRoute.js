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
// import { Navigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "./AuthContext";
// const RoleBasedRoute = ({ allowedRoles, children }) => {
//   const {user} = useContext(AuthContext);
  
//   const roles = user?.roles || [];
//   const allowedroles = allowedRoles || [];
//   console.log('user in RoleBasedRoute', user)
//   console.log('roles in RoleBasedRoute', roles)
//   console.log('allowedRoles in RoleBasedRoute', allowedRoles)
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }
 
//   const hasAccess = roles.every(role => allowedroles.includes(role));
  
//   if (!hasAccess) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return children;
// };

// export default RoleBasedRoute;




// RoleBasedRoute.js
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const RoleBasedRoute = ({ allowedRoles, children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <p>Loading...</p>; // or a spinner
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const roles = user?.roles || [];
  const allowedroles = allowedRoles || [];

  // Use some instead of every (to check if user has at least one allowed role)
  const hasAccess = roles.some(role => allowedroles.includes(role));

  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleBasedRoute;
