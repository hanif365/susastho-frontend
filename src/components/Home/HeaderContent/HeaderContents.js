import React from 'react';
import './HeaderContents.css';
import HeaderVideo from '../../../Assets/Videos/virus.mp4'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const HeaderContents = () => {
    return (
        <div className='header-content-new'>
            <section className="header-content-inner">
                <video src={HeaderVideo} muted loop autoPlay></video>
                <div className="overlay"></div>
                <div className="text">
                    <h2>WE CARE ABOUT YOUR HEALTH </h2>
                    <p>Health is wealth. Everyone Should take care of their Health. You Can get a lot of health related Services on our platform.</p>
                    <a href="#" href="#services">MORE DETAILS</a>
                </div>

                <ul className="d-flex justify-content-center list-unstyled social">
                    <a href="https://github.com/hanif365" target="_blank" className="header-fa-link me-3"><FontAwesomeIcon icon={faGithub} /></a>
                    <a href="https://www.linkedin.com/in/programmerhanif/" className="me-3 header-fa-link" target="_blank"><FontAwesomeIcon icon={faLinkedin} /></a>
                    <a href="https://www.facebook.com/M.A.HanifKhaan/" target="_blank" className="header-fa-link me-3"><FontAwesomeIcon icon={faFacebook} /></a>
                    <a href="https://www.instagram.com/abuhanif.cse3/" className="header-fa-link me-3" target="_blank"><FontAwesomeIcon icon={faInstagram} /></a>
                    <a href="https://hanif.netlify.app/" className="header-fa-link me-3" target="_blank"><FontAwesomeIcon icon={faGlobe} /></a>
                </ul>
            </section>
        </div>

    );
};

export default HeaderContents;