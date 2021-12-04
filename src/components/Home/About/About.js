import React from 'react';
import './About.css';
import AboutUs from '../../../Assets/Images/about-us.png'

const About = () => {
    return (
        <div id="about-us" className="pt-4">
            <div className="container-fluid about-main py-5 my-5">
                <div className="row">
                    <div className="col-md-6 about-img">
                        <img src={AboutUs} alt="" className="img-fluid" />
                    </div>
                    <div className="col-md-6 align-self-center about-content">
                        <h1>WE CARE YOUR HEALTH</h1>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse tenetur maxime at odio, alias voluptatum necessitatibus, placeat officiis, repellendus odit tempore eum et suscipit numquam ducimus culpa consequatur velit ullam! Culpa molestias doloremque officia necessitatibus id sapiente qui odit iure, modi autem ducimus! Vitae aliquam excepturi ducimus accusamus. Vero doloribus officia, reiciendis odit ut amet? Animi ut molestiae optio impedit qui tenetur ab laudantium vitae perspiciatis, similique quaerat placeat nisi quos corrupti sed nemo deleniti sit nihil, ipsa dolorum. Quae ipsa nostrum nisi placeat, qui iusto ab ibus. Ad dolor impedit dolores illum sint veniam, voluptates saepe nostrum cum ut dolorum, dicta omnis iusto accusamus qui quod vero, ducimus incidunt eveniet soluta ex ullam esse voluptas aliquid. Perspiciatis vitae molestias ipsam! A.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;