import React from 'react';
import './HeaderContent.css'
import headerContentImg from '../../../Assets/Images/header-content-img.png'
import dreamBg from '../../../Assets/Images/dream-bg.png'


const HeaderContent = () => {
    return (
        <div className="container-fluid header-content-main py-4" id="home">
            <div className="row">
                <div className="col-md-6 align-self-center ps-5">
                    <h1 className="text-header">WE CARE ABOUT YOUR HEALTH</h1>
                    <p className="text-para">Health is wealth. Everyone Should take care of their Health. You Can get a lot of health related information on our platform.</p>
                    <a className="btn btn-field" href="#services">MORE DETAILS</a>
                </div>
                <div className="col-md-6">
                    <img src={headerContentImg} className="img-fluid" alt="" />
                </div>
            </div>
        </div>
    );
};

export default HeaderContent;