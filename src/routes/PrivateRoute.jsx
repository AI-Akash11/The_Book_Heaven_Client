import React from "react";
import useAuth from "../hooks/useAuth";
import Loading from "../components/shared/Loading";
import { Navigate, useLocation } from "react-router";
import Swal from "sweetalert2";

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();

    if(loading){
        return <Loading></Loading>
    }

    if(!user){
          Swal.fire({
            icon: "error",
            title: "Login Required",
            text: "Please login first to access this content",
          });

        return <Navigate state={location.pathname} to={'/auth/login'}></Navigate>
    }

    return children

};

export default PrivateRoute;
