import React from 'react';
import Banner from '../components/home/Banner';
import AboutSection from '../components/home/AboutSection';

const Home = () => {
    return (
        <div className='space-y-10 md:space-y-20'>
            <Banner></Banner>
            <AboutSection></AboutSection>
        </div>
    );
};

export default Home;