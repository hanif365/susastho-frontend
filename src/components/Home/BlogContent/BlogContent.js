import React from 'react';
import './BlogContent.css'

const BlogContent = ({ blog }) => {
    const { id, title, description, image, icon_img, date, writer_name, designation, company, link } = blog;
    return (
        <div className="col g-4">
            <a className="blog-content-link" target="_blank" href={link}>
                <div className="card blog-content-main">
                    <img src={image} className="card-img-top" alt="..." />

                    <div className="blog-card-body text-wrap w-100">
                        <h3 className="card-title">{title}</h3>
                        <p className="card-text">{description}</p>
                        <p className="text-end">Published : {date}</p>
                    </div>
                </div>
            </a>


        </div>
    );
};

export default BlogContent;