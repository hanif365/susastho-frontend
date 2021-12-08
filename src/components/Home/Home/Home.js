import React from 'react';
import About from '../About/About';
import Blogs from '../Blogs/Blogs';
import Header from '../Header/Header';
import Services from '../Services/Services';
import './Home.css'

const Home = () => {
    return (
        <div>
            <Header></Header>
            <Services></Services>
            <About></About>
            <Blogs></Blogs>
        </div>
    );
};

export default Home;