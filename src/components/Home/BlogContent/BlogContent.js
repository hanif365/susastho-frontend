import React from 'react';
import BlogDetails from '../BlogDetails/BlogDetails';
import { Link } from 'react-router-dom';
import './BlogContent.css'

const BlogContent = ({ blog }) => {
    const { id, title, description, image, icon_img, date, writer_name, designation, company } = blog;
    return (
        <div className="col g-4">
            <Link to={`/blogdetails/${id}`}>
                <div className="card blog-content-main">
                    <img src={image} className="card-img-top" alt="..." />

                    <div className="blog-card-body text-wrap w-100 text-center">
                        <h3 className="card-title">{title}</h3>
                        <p className="card-text text-center">{description}</p>
                        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                    </div>
                </div>
            </Link>


        </div>
    );
};

export default BlogContent;