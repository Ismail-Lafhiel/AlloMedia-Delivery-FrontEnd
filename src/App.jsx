import "./App.css";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Footer from "./partials/Footer";
import NavbarMenu from "./partials/NavbarMenu";


function App() {
  return (
    <>
      <NavbarMenu />
      {/* <Register /> */}
      <Login/>
      <Footer />
    </>
  );
}

export default App;
