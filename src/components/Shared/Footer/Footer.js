import React from 'react';
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="bg-colorful footer-main py-3 ">
                    <ul className="d-flex justify-content-center list-unstyled">
                        <a href="https://github.com/hanif365" target="_blank" className="fa-link me-3"><FontAwesomeIcon icon={faGithub} /></a>
                        <a href="https://www.linkedin.com/in/programmerhanif/" className="me-3 fa-link" target="_blank"><FontAwesomeIcon icon={faLinkedin} /></a>
                        <a href="https://www.facebook.com/M.A.HanifKhaan/" target="_blank" className="fa-link me-3"><FontAwesomeIcon icon={faFacebook} /></a>
                        <a href="https://www.instagram.com/abuhanif.cse3/" className="fa-link me-3" target="_blank"><FontAwesomeIcon icon={faInstagram} /></a>
                        <a href="https://hanif.netlify.app/" className="fa-link me-3" target="_blank"><FontAwesomeIcon icon={faGlobe} /></a>
                    </ul>
            
                    <div className=" d-flex justify-content-center flex-wrap text-light">
                        <div>
                            @2021 <span className="project-name mx-2"> SUSASTHO </span> - All Rights reserved.
                        </div>
                        <div className='ps-md-2'>
                            Created By <span className="creator-name mx-2"> <a href="https://hanif.netlify.app/" target="_blank">M.A.HANIF</a> </span>
                        </div>

                    </div>



                    <div>
                        <a href="#" className="bottom-to-top"><FontAwesomeIcon icon={faArrowUp} size="2x" /></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;