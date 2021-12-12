import React from 'react';
import './HealthTipsList.css'

const HealthTipsList = ({ healthTips }) => {
    const { Health_Tips_Title, Description, imageURL, Published_Date, Writer_Name, Company, Link, Health_Tips_Added_date } = healthTips;
    return (
        <div className="col g-4">
            <div class="card healthTipsList-card pb-3">
                <img src={imageURL} class="card-img-top" alt="..." />
                <div class="healthTipsList-card-body">
                    <h5 class="card-title">{Health_Tips_Title}</h5>
                    <p class="card-text">{Description}</p>
                    <p class="card-text">Writer Name : {Writer_Name}</p>
                    <p class="card-text">Company : {Company}</p>
                    <p class="card-text">Published Date : {Published_Date}</p>
                    <a  target="_blank" href={Link} className="btn btn-field">Read More</a>
                </div>
            </div>
        </div>
    );
};

export default HealthTipsList;