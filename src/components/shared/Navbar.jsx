import { Link, NavLink } from "react-router";
import Loading from "./Loading";
import Logo from "../../utils/Logo";
import useAuth from "../../hooks/useAuth";
import { button, div } from "framer-motion/client";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => {
        console.log(error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/all-books"}>All Books</NavLink>
      </li>
      <li>
        <NavLink to={"/add-book"}>Add Book</NavLink>
      </li>
      <li>
        <NavLink to={"/my-books"}>My Books</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-primary shadow-sm px-2">
      <div className="navbar-start">
        <div className="dropdown text-accent">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-secondary lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 font-bold rounded-box z-1 mt-3 w-48 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <div className="ml-2 lg:ml-0">
          <Logo></Logo>
        </div>
      </div>
      <div className="navbar-center text-white hidden lg:flex">
        <ul className="menu font-bold menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-hover dropdown-end z-100">
            <img
              src={user.photoURL}
              tabIndex={0}
              role="button"
              className="m-1 rounded-full max-w-10"
            ></img>
            <ul
              tabIndex="-1"
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-40 p-2 shadow-sm"
            >
              <li>
                <p className="font-semibold">Name: {user.displayName}</p>
              </li>
              <li>
                <button
                  onClick={handleLogOut}
                  className="btn btn-accent text-white hover:bg-amber-500 font-semibold"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link
              to={"/auth/login"}
              className="btn btn-accent text-white hover:bg-amber-500 font-semibold"
            >
              Login
            </Link>
            <Link
              to={"/auth/register"}
              className="btn btn-secondary hover:bg-blue-500 text-white font-semibold"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
