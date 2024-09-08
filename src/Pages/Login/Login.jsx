import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";

import bg from "../../assets/others/authentication.png";
import loginImage from "../../assets/others/authentication1.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import SocialLogin from "../../Componets/SocialLogin/SocialLogin";


const Login = () => {
  const [ isDisabled, setDisabled ] = useState(true);
  const { signIn } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/"

  useEffect(()=>{
    loadCaptchaEnginge(6);
  },[]);


  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then(() =>{
        Swal.fire({
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 1500
        });
        navigate(from, { replace: true });
      })
      .catch(err =>{
        Swal.fire({
          icon: "error",
          title: err,
        });
      });
  };

  const handleValidateCaptcha = (e)=>{
    const user_captcha_value = e.target.value;
    if(validateCaptcha(user_captcha_value)){
      setDisabled(false)
    }else{
      setDisabled(true)
    }
  }
  return (
    <div className="hero min-h-screen flex items-center justify-center">
      <Helmet>
        <title>Bistro Boss - Login</title>
      </Helmet>
      <div
        className="hero min-h-[715px] shadow-all-2xl xl:px-24 mx-4 xl:mx-0"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <img className="lg:w-[648px] " src={loginImage} alt="image" />
          </div>
          <div className="card w-full">
            <h1 className="text-5xl font-bold text-center">Login</h1>
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="text-xl font-semibold">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="text-xl font-semibold">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  type="text"
                  name="captcha"
                  onBlur={handleValidateCaptcha}
                  placeholder="Type the captcha above"
                  className="input input-bordered mb-3"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button
                  type="submit"
                  disabled={isDisabled}
                  className="btn text-xl font-bold bg-[#D1A054] hover:bg-[#D1A054] text-white mb-8"
                >
                  Sign In
                </button>
                <p className="text-xl text-[#D1A054] font-semibold text-center mb-6">
                  New here?{" "}
                  <Link className="font-bold" to="/signup">
                    Create a New Account
                  </Link>
                </p>
                <p className="text-center text-xl font-medium mb-4">
                  Or sign in with
                </p>
              </div>
              <div className="form-control justify-between flex-row w-44 mx-auto">
                <SocialLogin/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
