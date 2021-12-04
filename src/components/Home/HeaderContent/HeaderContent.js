import React from 'react';
import './HeaderContent.css'
import headerContentImg from '../../../Assets/Images/header-content-img.png'
import dreamBg from '../../../Assets/Images/dream-bg.png'


const HeaderContent = () => {
    return (
        <div className="container-fluid header-content-main py-4">
            <div className="row">
                <div className="col-md-6 align-self-center ps-5">
                    <h1>WE CARE ABOUT YOUR HEALTH</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur temporibus eaque, eligendi quae possimus eius voluptate ducimus enim iusto cumque?</p>
                    <button className="btn btn-outline-danger btn-field">MORE DETAILS</button>
                </div>
                <div className="col-md-6">
                    <img src={headerContentImg} className="img-fluid" alt="" />
                </div>
            </div>
        </div>
    );
};

export default HeaderContent;