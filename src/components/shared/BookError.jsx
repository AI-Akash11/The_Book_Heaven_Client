import React from 'react';

const BookError = () => {
    return (
        <div className='flex flex-col justify-center items-center p-10 md:p-15'>
            <div className='max-w-[300px] md:max-w-[600px] mb-6 md:mb-10'>
                <img src='https://i.ibb.co.com/Kx9pt7p6/App-Error.png' alt="" />
            </div>
            <p className='font-semibold text-5xl mb-2'>OPPS!! NO BOOK FOUND</p>
            <p className='font-light text-sm text-gray-600 mb-6'>You haven't added any book on our system.  please try to add a book first.</p>
        </div>
    );
};

export default BookError;