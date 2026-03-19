import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="min-h-screen">
      <Link
        to={"/"}
        className=" flex items-center justify-start text-base-content underline pt-2 pl-2"
      >
        <BsArrowLeft />
        Home
      </Link>
      <div className="min-h-[calc(100vh-36px)] flex items-center justify-center">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AuthLayout;
