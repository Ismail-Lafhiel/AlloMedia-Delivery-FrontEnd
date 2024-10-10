import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Footer from "./partials/Footer";
import NavbarMenu from "./partials/NavbarMenu";
import ResetPasswordRequest from "./auth/ResetPasswordRequest";
import ResetPassword from "./auth/resetPassword";
import Home from "./Home";
import Contact from "./Contact";
import Pricing from "./Pricing";
import AboutUs from "./AboutUs";
import ConfirmEmail from "./auth/ConfirmEmail";
import PublicRoute from "./PublicRoute";
import Profile from "./profile/Profile";
import PrivateRoute from "./PrivateRoute";
import { ToastContainer } from "react-toastify";
import TwoFA from "./auth/TwoFactorAuthentication";

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
