import { useContext } from "react";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa6";
import { AuthContext } from "../../Context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: user?.displayName,
          email: user?.email,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          Swal.fire({
            title: "Login successful",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(from, { replace: true });
        });
      })
      .catch((err) => {
        Swal.fire({
          title: err,
          icon: "error",
        });
      });
  };
  return (
    <>
      <button className="btn btn-circle btn-outline border-2" disabled>
        <FaFacebookF className="w-5 h-5" />
      </button>
      <button
        onClick={handleGoogleSignIn}
        className="btn btn-circle btn-outline border-2"
      >
        <FaGoogle className="w-5 h-5" />
      </button>
      <button className="btn btn-circle btn-outline border-2" disabled>
        <FaGithub className="w-5 h-5" />
      </button>
    </>
  );
};

export default SocialLogin;
