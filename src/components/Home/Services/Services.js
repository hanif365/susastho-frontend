import React from 'react';
import './Services.css'
import AllServicesData from '../../../Assets/Data/Services.json'
import ServiceContent from '../ServiceContent/ServiceContent';

const Services = () => {
    console.log(typeof AllServicesData)

    const ServicesData = AllServicesData.slice(0, 6);
    console.log(ServicesData)
    return (
        <div className='' id="services">
            <div id="" className="service-container">
                <div className="container text-center" id="">
                    <div className="row">
                        <div className="col-12">
                            <h1>OUR SERVICES</h1>
                            <hr className="horizontal-line" />
                            <div className="row row-cols-1 row-cols-md-3 pt-4">
                                {
                                    ServicesData.map(service => <ServiceContent key={service.id} service={service}></ServiceContent>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;