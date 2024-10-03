import "./App.css";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Footer from "./partials/Footer";
import NavbarMenu from "./partials/NavbarMenu";
import ResetPasswordRequest from "./auth/ResetPasswordRequest";
import ResetPassword from "./auth/resetPassword";


function App() {
  return (
    <>
      <NavbarMenu />
      {/* <Register /> */}
      {/* <Login/> */}
      {/* <ResetPasswordRequest/> */}
      <ResetPassword/>
      <Footer />
    </>
  );
}

export default App;
