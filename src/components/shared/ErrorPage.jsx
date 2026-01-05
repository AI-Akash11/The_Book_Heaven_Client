import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 text-center">
      <Link
        to={"/"}
        className=" flex items-center justify-start text-secondary underline pt-2 pl-2"
      >
        <BsArrowLeft />
        Home
      </Link>
      <div className="flex flex-col items-center justify-center min-h-[90vh] px-6">
        <img
          src="https://i.ibb.co.com/0ythqdy3/error-404.png"
          alt="404 Error"
          className="w-72 md:w-96 mb-8"
        />
        <h1 className="text-5xl font-extrabold text-primary mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-600 mb-8 max-w-md">
          Looks like the page you’re trying to visit doesn’t exist or has been
          moved.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
