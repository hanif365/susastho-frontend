import React from 'react';
import './CommingSoon.css';
import ComingSoonImg from '../../../Assets/Images/coming-soon.jpg';
import Navbar from '../Navbar/Navbar';

const CommingSoon = () => {
    return (
        <div className='container-fluid comingSoonContainer'>
            <Navbar></Navbar>
            <div className="row">
                <div className="col-md-12 d-flex justify-content-center">
                    <img src={ComingSoonImg} alt="ComingSoonImg" className='ComingSoonImg' />
                </div>
            </div>
        </div>
    );
};

export default CommingSoon;