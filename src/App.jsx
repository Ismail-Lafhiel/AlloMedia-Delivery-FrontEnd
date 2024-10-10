import "./App.css";
// dependecies
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
//
// Partials
import NavbarMenu from "./partials/NavbarMenu";
import Footer from "./partials/Footer";
// 
// pages
import Register from "./auth/Register";
import Login from "./auth/Login";
import ResetPasswordRequest from "./auth/ResetPasswordRequest";
import ResetPassword from "./auth/resetPassword";
import Home from "./Home";
import Contact from "./Contact";
import Pricing from "./Pricing";
import AboutUs from "./AboutUs";
import ConfirmEmail from "./auth/ConfirmEmail";
import Profile from "./profile/Profile";
import TwoFA from "./auth/TwoFactorAuthentication";
import Error404 from "./Error404";
// 
// routes access
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
//

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {" "}
        <Router>
          <header>
            <NavbarMenu />
          </header>
          <main className="flex-grow">
            {" "}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-us" element={<Contact />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route path="/confirm-email" element={<ConfirmEmail />} />
              <Route
                path="/reset-password-request"
                element={<ResetPasswordRequest />}
              />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/verify-2fa" element={<TwoFA />} />
              <Route path="*" element={<Error404/>}/>
            </Routes>
          </main>
          <footer>
            <Footer />
          </footer>
        </Router>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
