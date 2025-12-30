import { Link, NavLink } from "react-router";
import Loading from "./Loading";
import Logo from "../../utils/Logo";

const Navbar = () => {
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
    <div className="navbar bg-primary shadow-sm">
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
      <div className="navbar-end flex gap-3">
        <Link to={"/auth/login"} className="btn btn-accent text-white font-semibold">
          Login
        </Link>
        <Link
          to={"/auth/register"}
          className="btn btn-secondary text-white font-semibold"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
