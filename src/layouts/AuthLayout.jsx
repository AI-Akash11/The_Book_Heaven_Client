import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='container'>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;