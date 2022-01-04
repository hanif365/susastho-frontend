import React, { useEffect, useState } from 'react';
import './HeaderContents.css';
import CovidVideo from '../../../Assets/Videos/virus.mp4';
import InjectionVideo from '../../../Assets/Videos/injection.mp4'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useLocation } from 'react-router-dom';

const HeaderContents = () => {
    const location = useLocation();
    // console.log("Location is now: ", location);

    const [headerVideo, setHeaderVideo] = useState('');
    const [covid, setCovid] = useState(false);

    useEffect(() =>{
        if ((window.location.pathname === "/covid-19")) {
            setHeaderVideo(InjectionVideo);
            setCovid(true);
          } else{
            setHeaderVideo(CovidVideo);
            setCovid(false);
          }
    },[])


    return (
        <div className='header-content-new'>
            <section className="header-content-inner">
                <video src={headerVideo} muted loop autoPlay></video>
                <div className="overlay"></div>
                <div className="text">
                    {/* <h2>WE CARE ABOUT YOUR HEALTH</h2> */}
                    {
                        covid ? <h3>Stay at home, save lives!</h3> : <h2>WE CARE ABOUT YOUR HEALTH</h2>
                    }

                    {/* <p>Health is wealth. We Should take care of our Health. You Can get a lot of health-related Services and information on our platform.</p> */}
                    {
                        covid ? <p></p> : <p>Health is wealth. We Should take care of our Health. You Can get a lot of health-related Services and information on our platform.</p>
                    }
                    {/* <a href="#" href="#services">MORE DETAILS</a> */}
                    {
                        covid ? <a href="#covid-19-dashboard">Covid-19 Dashboard</a> : <a href="#" href="#services">MORE DETAILS</a>
                    }
                </div>

                {!covid && <ul className="d-flex justify-content-center list-unstyled social">
                    <a href="https://github.com/hanif365" target="_blank" className="header-fa-link me-3"><FontAwesomeIcon icon={faGithub} /></a>
                    <a href="https://www.linkedin.com/in/programmerhanif/" className="me-3 header-fa-link" target="_blank"><FontAwesomeIcon icon={faLinkedin} /></a>
                    <a href="https://www.facebook.com/M.A.HanifKhaan/" target="_blank" className="header-fa-link me-3"><FontAwesomeIcon icon={faFacebook} /></a>
                    <a href="https://www.instagram.com/abuhanif.cse3/" className="header-fa-link me-3" target="_blank"><FontAwesomeIcon icon={faInstagram} /></a>
                    <a href="https://hanif.netlify.app/" className="header-fa-link me-3" target="_blank"><FontAwesomeIcon icon={faGlobe} /></a>
                </ul>}
            </section>
        </div>

    );
};

export default HeaderContents;