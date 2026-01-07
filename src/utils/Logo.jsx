import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <div>
            <Link className='flex gap-1 items-center text-2xl font-black text-accent'>
            <img className='w-12' src="https://i.ibb.co.com/dJmHymSK/icons8-book-48.png" alt="" />
            <p className='hidden md:block'>Book <span className='text-primary'>Heaven</span></p>
            </Link>
        </div>
    );
};

export default Logo;