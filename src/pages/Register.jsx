import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../components/auth/SocialLogin";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import Loading from "../components/shared/Loading";
import Swal from "sweetalert2";

const Register = () => {
  const [eye, setEye] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUserProfile, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleRegistration = async (data) => {
    try {
      const profileImage = data.photo[0];

      await registerUser(data.email, data.password);

      // image hosting
      const formData = new FormData();
      formData.append("image", profileImage);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;

      const imageRes = await axios.post(image_API_URL, formData);

      const imageURL = imageRes.data.data.url;

      const userProfile = {
        displayName: data.name,
        photoURL: imageURL,
      };

      await updateUserProfile(userProfile);

      navigate(location?.state || "/");

    } catch (error) {
      console.log(error);
        Swal.fire({
          icon: "error",
          title: "Registration failed",
          text: "Registration has failed. Please try again",
        });
    }
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="py-5 px-2 md:py-20 lg:py-30 flex justify-center items-center">
      <div className="bg-base-200 border border-base-300 p-8 rounded-2xl shadow-lg w-100 md:w-145">
        <h2 className="text-center text-5xl text-base-content font-black mb-10">
          Register
        </h2>

        <form
          onSubmit={handleSubmit(handleRegistration)}
          className="flex flex-col gap-1 relative"
        >
          {/* Name */}
          <label className="text-sm  mt-3 ml-1">Name</label>
          <input
            type="text"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Name can only contain letters",
              },
            })}
            placeholder="Enter Your Name"
            className="w-full px-3 py-2 rounded-xl bg-base-100 border border-base-300 shadow-inner outline-none focus:border-accent focus:ring-1 focus:ring-accent/40"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1 ml-1">
              {errors.name.message}
            </p>
          )}

          {/* Image */}
          <label className="text-sm mt-3 ml-1">Profile Image</label>

          <input
            type="file"
            accept="image/*"
            {...register("photo", {
              required: "Profile image is required",
            })}
            className="file-input w-full bg-base-100 border border-base-300 rounded-xl shadow-inner outline-none focus:border-accent"
          />

          {errors.photo && (
            <p className="text-red-400 text-sm mt-1 ml-1">
              {errors.photo.message}
            </p>
          )}

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
            className="w-full px-3 py-2 rounded-xl bg-base-100 border border-base-300 shadow-inner outline-none focus:border-accent focus:ring-1 focus:ring-accent/40"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1 ml-1">
              {errors.email.message}
            </p>
          )}

          {/* Password */}
          <label className="text-sm mt-3 ml-1">Password</label>

          <div className="relative">
            <input
              type={eye ? "password" : "text"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/,
                  message:
                    "Password must include uppercase, lowercase, number, and special character",
                },
              })}
              placeholder="Create a Password"
              className="w-full px-3 py-2 rounded-xl bg-base-100 border border-base-300 shadow-inner outline-none focus:border-accent focus:ring-1 focus:ring-accent/40"
            />

            <button
              type="button"
              onClick={() => setEye(!eye)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-base-content cursor-pointer"
            >
              {eye ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-400 text-sm mt-1 ml-1">
              {errors.password.message}
            </p>
          )}

          <button
            type="submit"
            className="mt-5 w-full py-3 rounded-xl bg-primary text-error font-bold text-xl shadow-md hover:shadow-lg active:shadow-sm transition"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-4 text-base-content/80 text-sm">
          Already have an account?{" "}
          <Link
            state={location.state}
            to={"/auth/login"}
            className="text-primary font-semibold underline underline-offset-4"
          >
            Login
          </Link>
        </div>

        <div className="flex items-center px-15 my-4">
          <hr className="grow border-t border-base-content/70" />
          <span className="mx-4 text-base-content/90">or</span>
          <hr className="grow border-t border-base-content/70" />
        </div>

        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
