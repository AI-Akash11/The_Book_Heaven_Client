import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link} from "react-router";
import SocialLogin from "../components/auth/SocialLogin";

const Register = () => {
  const [eye, setEye] = useState(true);

  return (
    <div className="py-5 px-2 md:py-20 lg:py-30 flex justify-center items-center">
      <div className="bg-base-200 p-8 rounded-2xl shadow-[9px_9px_16px_#a3b1c6,-9px_-9px_16px_#ffffff] w-100 md:w-145">
        <h2 className="text-center text-5xl text-primary font-black mb-10">
          Register
        </h2>

        <form className="flex flex-col gap-1 relative">
          <label className="text-sm  mt-3 ml-1">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            className="px-3 py-2 rounded-xl bg-[#e0e5ec] shadow-inner shadow-[#a3b1c6]/70 outline-none"
          />

          <label className="text-sm  mt-3 ml-1">Photo URL</label>
          <input
            type="text"
            name="photo"
            placeholder="Enter a photo URL"
            className="px-3 py-2 rounded-xl bg-[#e0e5ec] shadow-inner shadow-[#a3b1c6]/70 outline-none"
          />

          <label className="text-sm  mt-3 ml-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="px-3 py-2 rounded-xl bg-[#e0e5ec] shadow-inner shadow-[#a3b1c6]/70 outline-none"
          />

          <label className="text-sm  mt-3 ml-1">Password</label>
          <input
            type={eye ? "password" : "text"}
            name="password"
            placeholder="Password"
            className="px-3 py-2 rounded-xl bg-[#e0e5ec] shadow-inner shadow-[#a3b1c6]/70 outline-none"
          />
          <div
            onClick={() => {
              setEye(!eye);
            }}
            className="absolute right-4 top-74.5 text-xl cursor-pointer"
          >
            {eye ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
          </div>


          <button
            type="submit"
            className="mt-5 w-full py-3 rounded-xl bg-secondary shadow-[5px_5px_10px_#a3b1c6,-5px_-5px_10px_#ffffff] font-bold hover:bg-accent transition text-xl text-white"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-4 text-primary text-sm">
          Already have an account?{" "}
          <Link
            to={"/auth/login"}
            className="text-accent font-semibold underline underline-offset-4"
          >
            Login
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

export default Register;
