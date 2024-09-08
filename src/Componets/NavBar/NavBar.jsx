import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import Swal from "sweetalert2";
import { BsCart3 } from "react-icons/bs";
import useCart from "../../hooks/useCart";
import Logo from "../Logo/Logo";
import useAdmin from "../../hooks/useAdmin";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();
  const [isAdmin] = useAdmin();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Log out successful",
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: err,
        });
      });
  };
  const navItems = (
    <>
      <li>
        <Link to="/">HOME</Link>
      </li>
      <li>
        <Link to="/menu">OUR MENU</Link>
      </li>
      <li>
        <Link to="/order/salad">Order Food</Link>
      </li>

      {user && isAdmin && (
        <li>
          <Link to="dashboard/adminHome">DASHBOARD</Link>
        </li>
      )}

      {user && !isAdmin && (
        <li>
          <Link to="dashboard/userHome">DASHBOARD</Link>
        </li>
      )}

      <li>
        <Link to="/dashboard/cart" className="btn btn-ghost btn-circle me-3">
          <div className="indicator">
            <BsCart3 className="w-7 h-7" />
            <span className="badge badge-sm  badge-error text-white indicator-item">
              {cart.length}
            </span>
          </div>
        </Link>
      </li>

      {user ? (
        <li>
          <button
            onClick={handleLogOut}
            className="btn text-xl font-bold btn-outline btn-warning"
          >
            Log Out
          </button>
        </li>
      ) : (
        <li>
          <Link
            className="btn text-xl font-bold btn-outline btn-success"
            to="/login"
          >
            Login
          </Link>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar justify-between fixed z-10 max-w-screen-xl bg-[#151515] bg-opacity-50 text-white uppercase">
      <div className="">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content text-xl font-bold text-black bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <Logo />
      </div>
      <div className="hidden lg:flex">
        <ul className="menu menu-horizontal text-xl font-extrabold px-1">
          {navItems}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
