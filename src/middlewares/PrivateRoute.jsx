import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Use named import

const PrivateRoute = ({ children }) => {
  const token = Cookies.get("token");

  if (token) {
    try {
      // Decoding the token to get expiration time
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      // If the token is expired, remove it and redirect to login
      if (decodedToken.exp < currentTime) {
        Cookies.remove("token");
        return <Navigate to="/login" />;
      }

      // If token is valid, allow access to the route
      return children;
    } catch (error) {
      console.error("Invalid token", error);
      Cookies.remove("token");
      return <Navigate to="/login" />;
    }
  }

  // If no token is found, redirect to login
  return <Navigate to="/login" />;
};

export default PrivateRoute;