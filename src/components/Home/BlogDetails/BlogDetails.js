import React from 'react';
import './BlogDetails.css';
import { useParams } from 'react-router-dom';
import AllBlogsData from '../../../Assets/Data/BlogsData.json';

const BlogDetails = () => {
    // const {id} = id;
    const { id } = useParams();
    console.log("ID Is : ", id);

    const idBef = id - 1;
    const BlogData = AllBlogsData.slice(idBef, id)
    console.log("BlogData : ", BlogData);
    console.log("BlogData : ", BlogData[0].title);


    return (
        // <div>
        //     <h1>Blog Details {BlogData[0].id}</h1>
        //     <h2>{BlogData[0].title}</h2>
        // </div>

        <div class="card blog-details-card py-5">
            <img src={BlogData[0].image} class="card-img-top img-fluid" alt="..." />
            <div class="blog-details-card-body">
                <h5 class="card-title">{BlogData[0].title}</h5>
                <p class="card-text">{BlogData[0].description}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>


    );
};

export default BlogDetails;