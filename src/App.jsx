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

function App() {
  return (
    <>
      <Router>
        <NavbarMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/reset-password-request"
            element={<ResetPasswordRequest />}
          />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
