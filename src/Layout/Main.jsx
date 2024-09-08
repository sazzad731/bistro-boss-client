import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Componets/Footer/Footer";
import NavBar from "../Componets/NavBar/NavBar";
import bg from "../assets/others/authentication.png"
const Main = () => {
  const location = useLocation();
  const isHeaderFooter =
    location.pathname.includes("login") || location.pathname.includes("signup");

  return (
    <div style={{ backgroundImage: `url(${!isHeaderFooter || bg})` }}>
      <div className="max-w-screen-xl mx-auto">
        {isHeaderFooter || <NavBar />}
        <Outlet />
        {isHeaderFooter || <Footer />}
      </div>
    </div>
  );
};

export default Main;