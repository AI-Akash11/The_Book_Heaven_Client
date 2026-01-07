import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { Link, Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='container  bg-base-100 min-h-screen'>
            <Link to={'/'} className=' flex items-center justify-start text-base-content underline pt-2 pl-2'><BsArrowLeft/>Home</Link>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;