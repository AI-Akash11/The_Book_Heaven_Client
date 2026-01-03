import React from 'react';
import Banner from '../components/home/Banner';
import AboutSection from '../components/home/AboutSection';
import FeaturedBook from '../components/home/FeaturedBook';
import LatestBooks from '../components/home/LatestBooks';

const Home = () => {
    return (
        <div className='space-y-10 md:space-y-20'>
            <Banner></Banner>
            <LatestBooks></LatestBooks>
            <FeaturedBook></FeaturedBook>
            <AboutSection></AboutSection>
        </div>
    );
};

export default Home;