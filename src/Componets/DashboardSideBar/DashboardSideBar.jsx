import { BiSolidHome } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import { FaBagShopping, FaBars, FaEnvelope, FaListUl, FaStar, FaWallet } from "react-icons/fa6";
import { FaCalendarAlt, FaCalendarCheck, FaBook, FaUsers } from "react-icons/fa";
import { ImSpoonKnife } from "react-icons/im";
import useCart from "../../hooks/useCart";
import useAdmin from "../../hooks/useAdmin";
import useAuth from "../../hooks/useAuth";


const DashboardSideBar = () => {
  const [ cart ] = useCart();
  const [ isAdmin ] = useAdmin()
  const { user } = useAuth();
  return (
    <div className="w-72 min-h-screen bg-[#D1A054]">
      <div className="ps-6 mt-12 mb-14">
        <Logo />
      </div>
      <ul className="menu text-lg font-medium uppercase gap-4">
        {isAdmin ? (
          <>
            <li>
              <NavLink to="/dashboard/adminHome">
                <BiSolidHome className="w-6 h-6" /> Admin Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/addItem">
                <ImSpoonKnife className="w-6 h-6" /> add items
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/manage-items">
                <FaListUl className="w-6 h-6" /> manage items
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/manageBoking">
                <FaBook className="w-6 h-6" /> Manage bookings
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/allUsers">
                <FaUsers className="w-6 h-6" /> All users
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/dashboard/userHome">
                <BiSolidHome className="w-6 h-6" /> User Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/reservation">
                <FaCalendarAlt className="w-6 h-6" /> reservation
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/paymentHistory">
                <FaWallet className="w-6 h-6" /> payment history
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/cart">
                <BsCart3 className="w-6 h-6" /> My Cart
                <div className="whiteindicator">
                  <span className="badge badge-md badge-error text-white indicator-item">
                    {cart.length}
                  </span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/addReview">
                <FaStar className="w-6 h-6" /> Add review
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/addReview">
                <FaCalendarCheck className="w-6 h-6" /> my booking
              </NavLink>
            </li>
          </>
        )}

        <div className="divider divider-neutral"></div>

        <li>
          <NavLink to="/">
            <BiSolidHome className="w-6 h-6" /> Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/menu">
            <FaBars className="w-6 h-6" /> Menu
          </NavLink>
        </li>
        <li>
          <NavLink to="/order/salad">
            <FaBagShopping className="w-6 h-6" /> Shop
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact">
            <FaEnvelope className="w-6 h-6" /> Contact
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default DashboardSideBar;
