import { Navigate } from "react-router-dom";

import { useAuthContext } from "../providers/AuthProvider";

const AuthDependentRoute = ({ children, isAuthPage = false }) => {
  // Aim is to redirect user to signup/signin if not authenticated. If authenticated, redirect to profile page
  const { isLoggedIn } = useAuthContext();

  if (isAuthPage && isLoggedIn) {
    return <Navigate to="/profile" replace />;
  } else if (!isAuthPage && !isLoggedIn) {
    return <Navigate to="/login-signup" replace />;
  }

  return children;
};

export default AuthDependentRoute;
