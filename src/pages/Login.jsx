import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../components/auth/SocialLogin";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import Loading from "../components/shared/Loading";

const Login = () => {
  const [eye, setEye] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {signInUser, loading} = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(loading)

  const handleUserLogin = (data) => {
    console.log(data);
    signInUser(data.email, data.password)
    .then(result=>{
      console.log(result.user)
      navigate(location?.state || '/')
    })
    .catch(error=>{
      console.log(error)
    })
  };

  if(loading){
    return <Loading></Loading>
  }

  return (
    <div className="py-5 px-2 md:py-10 lg:py-40 flex justify-center items-center">
      <div className="bg-base-200 p-8 rounded-2xl shadow-[9px_9px_16px_#a3b1c6,-9px_-9px_16px_#ffffff] w-100 md:w-125">
        <h2 className="text-center text-primary text-5xl font-black mb-10">
          Login
        </h2>

        <form
          onSubmit={handleSubmit(handleUserLogin)}
          className="flex flex-col gap-1 relative"
        >
          {/* email */}
          <label className="text-sm  mt-3 ml-1">Email</label>

          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
            placeholder="Enter Your Email"
            className="px-3 py-2 rounded-xl bg-[#e0e5ec] shadow-inner shadow-[#a3b1c6]/70 outline-none"
          />
          {errors.email && (
            <p className="text-error text-sm mt-1 ml-1">
              {errors.email.message}
            </p>
          )}

          {/* Password */}
          <label className="text-sm mt-3 ml-1">Password</label>

          <div className="relative">
            <input
              type={eye ? "password" : "text"}
              {...register("password", {
                required: "Password is required"
              })}
              placeholder="Enter Your Password"
              className="w-full px-3 py-2 pr-10 rounded-xl bg-[#e0e5ec] shadow-inner shadow-[#a3b1c6]/70 outline-none"
            />
            <button
              type="button"
              aria-label={eye ? "Show password" : "Hide password"}
              onClick={() => setEye(!eye)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-600 cursor-pointer"
            >
              {eye ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <p className="text-error text-sm mt-1 ml-1">
              {errors.password.message}
            </p>
          )}

          <p className="text-center mt-4 text-primary text-sm hover:underline hover:underline-offset-2">
            Forgot your password?
          </p>

          <button
            type="submit"
            className="mt-2 w-full py-3 rounded-xl bg-accent shadow-[5px_5px_10px_#a3b1c6,-5px_-5px_10px_#ffffff] font-bold hover:bg-secondary transition text-xl text-white"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4 text-primary text-sm">
          Dont have an account?{" "}
          <Link
          state={location?.state}
            to={"/auth/register"}
            className="text-secondary font-semibold underline underline-offset-4"
          >
            Register
          </Link>
        </div>

        <div className="flex items-center px-15 my-4">
          <hr className="grow border-t border-gray-400" />
          <span className="mx-4 text-primary">or</span>
          <hr className="grow border-t border-gray-400" />
        </div>

        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Login;
