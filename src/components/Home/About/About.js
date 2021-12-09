import React from 'react';
import './About.css';
import AboutUs from '../../../Assets/Images/about-us.png'

const About = () => {
    return (
        <div id="about-us" className="pt-4">
            <div className="container-fluid about-main pt-5 mt-5">
                <div className="row">
                    <div className="col-md-6 about-img">
                        <img src={AboutUs} alt="" className="img-fluid" />
                    </div>
                    <div className="col-md-6 align-self-center about-content">
                        <h1 className="text-header">WE CARE YOUR HEALTH</h1>
                        <p className="text-para">We are constantly working to protect your health. In this platform you can be search your favorite doctor, emergency ambulance service, Search Blood donner, Medical health tips, Home care delivery and many others services. We always try to update our service. You also know various important health related article which we published continuously. Hope you have a better experience for our platform.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;