import React from 'react';
import BlogContent from '../BlogContent/BlogContent';
import './Blogs.css'
import AllBlogsData from '../../../Assets/Data/BlogsData.json'

const Blogs = () => {
    const BlogData = AllBlogsData.slice(0, 6);
    return (
        <div id="blogs" className="pt-5">
            <div id="blogs" className="">
                <div className="container pt-5 mt-5 text-center" id="">
                    <div className="row">
                        <div className="col-12">
                            <h1>OUR BLOGS</h1>
                            <hr className="horizontal-line" />
                            <div className="row row-cols-1 row-cols-md-3 pt-4">
                                {
                                    BlogData.map(blog => <BlogContent key={blog.id} blog={blog}></BlogContent>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blogs;