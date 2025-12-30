import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';

const MainLayout = () => {
    return (
        <div className='container'>
            <Navbar></Navbar>
            <Outlet/>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;