import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import brandicon from '../../../Assets/Images/brandicon.png'

const Navbar = () => {
    return (
        <div>
            <nav class="navbar navbar-expand-lg fixed-top">
                <div class="container">
                    <a class="navbar-brand" href="#home"> <img src={brandicon} alt="" className="brandicon" /> <span className="first-letter">S</span>USASTHO</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav ms-auto">
                            <a class="nav-link active" aria-current="page" href="#home">HOME</a>
                            <a class="nav-link" href="#services">SERVICES</a>
                            <a class="nav-link" href="#about-us">ABOUT US</a>
                            <a class="nav-link" href="#blogs">BLOGS</a>
                            <a class="nav-link" href="#contact">CONTACT</a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;