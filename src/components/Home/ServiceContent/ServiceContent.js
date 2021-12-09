import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ServiceContent.css'

const ServiceContent = ({ service }) => {
    const { id, service_name, service_des, image, icon_img } = service;

    //var [serviceName, setServiceName] = useState("");

    // const myFunc = () =>{
    
    //     console.log(id)
    //     if(id == "doctors"){
    //         setServiceName = "doctors"
    //         console.log("Inner")
    //     }
    //     console.log(serviceName)
    // }
  
    return (
        <div className="col g-4">
            <Link to={id=="doctors" ? `/doctors` :``}>
            {/* <Link to={`/${serviceName}`}> */}
                <div className="card service-content-main" id={id == 5 ? "bg-danger" : ""}>
                    <img src={image} className="card-img-top" alt="..." />
                    <div className="card-body text-wrap w-100 text-center">
                        <h3 className="card-title">{service_name}</h3>
                        <p className="card-text text-center">{service_des}</p>
                        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ServiceContent;