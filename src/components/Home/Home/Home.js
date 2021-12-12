import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import About from '../About/About';
import Blogs from '../Blogs/Blogs';
import ContactForm from '../ContactForm/ContactForm';
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
            <ContactForm></ContactForm>
            <Footer></Footer>
        </div>
    );
};

export default Home;