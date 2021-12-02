import React from 'react';
import './ServiceContent.css'

const ServiceContent = ({ service }) => {
    const { service_name, service_des, image } = service;
    return (
        <div className="col g-4 py-3">
            <div className="card service-content-main">
                <img src={image} className="card-img-top" alt="..." />
                <div className="card-body text-wrap w-100 text-center">
                    <h3 className="card-title">{service_name}</h3>
                    <p className="card-text text-center">{service_des}</p>
                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                </div>
            </div>
        </div>
    );
};

export default ServiceContent;