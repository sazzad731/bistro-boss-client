import bg from "../../assets/others/authentication.png";
import signUpImage from "../../assets/others/authentication1.png";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../Componets/SocialLogin/SocialLogin";

const SignUp = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  // Axios
  const axiosPublic = useAxiosPublic();

  // tan stack query
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then(() => {
        updateUserProfile(data.name, data.photoURL).then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axiosPublic
            .post("/users", userInfo)
            .then((res) => {
              if (res.data.insertedId) {
                Swal.fire({
                  title: "Successfully created account",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/");
                reset();
              }
            })
            .catch((err) => {
              Swal.fire({
                title: err,
                icon: "error",
              });
            });
        });
      })
      .catch((err) => {
        Swal.fire({
          title: err.code,
          icon: "error",
        });
      });
  };

  return (
    <div className="hero min-h-screen flex items-center justify-center">
      <Helmet>
        <title>Bistro Boss - Sign up</title>
      </Helmet>
      <div
        className="hero min-h-[715px] shadow-all-2xl xl:px-24 py-12 mx-4 xl:mx-0"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <img className="lg:w-[648px] " src={signUpImage} alt="image" />
          </div>
          <div className="card w-full">
            <h1 className="text-5xl font-bold text-center">Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="text-xl font-semibold">Name</span>
                </label>
                <input
                  type="name"
                  name="name"
                  {...register("name", { required: true })}
                  placeholder="Name"
                  className="input input-bordered"
                />
                {/* errors will return when field validation fails  */}
                {errors.name && (
                  <span className="text-red-500">Name is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="text-xl font-semibold">Photo URL</span>
                </label>
                <input
                  type="url"
                  {...register("photoURL", { required: true })}
                  placeholder="Photo URL"
                  className="input input-bordered"
                />
                {/* errors will return when field validation fails  */}
                {errors.photoURL && (
                  <span className="text-red-500">Photo URL is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="text-xl font-semibold">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  {...register("email", { required: true })}
                  placeholder="email"
                  className="input input-bordered"
                />
                {/* errors will return when field validation fails  */}
                {errors.email && (
                  <span className="text-red-500">Email is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="text-xl font-semibold">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    pattern:
                      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&*{;'"}>.[</?%^|])/,
                  })}
                  placeholder="password"
                  className="input input-bordered"
                />
                {errors.password?.type === "required" && (
                  <span className="text-red-500">Passwor is required</span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-500">
                    Password must be 8 characters
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-500">
                    Password must have one uppercase, one lower case, one number
                    and one special characters
                  </span>
                )}
              </div>
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn text-xl font-bold bg-[#D1A054] hover:bg-[#D1A054] text-white mb-8"
                >
                  Sign Up
                </button>

                <p className="text-xl text-[#D1A054] font-semibold text-center mb-6">
                  Already registered?{" "}
                  <Link className="font-bold" to="/signup">
                    Go to login
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

export default SignUp;
