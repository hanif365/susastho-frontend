import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Sidebar from '../../Sidebar/Sidebar';
import './AddTestimonials.css';

const AddTestimonials = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [userImageURL, setUserImageURL] = useState(null);

    const onSubmit = data => {
        const testimonialUserData = {
            userID: data.userID,
            Username: data.Username,
            Email: data.Email,
            Gender: data.Gender,
            Company: data.Company,
            userImageURL: userImageURL,
            UserComment: data.UserComment,
            Testimonial_Added_date: (new Date().getUTCDate()) + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getUTCFullYear()),
        };

        const BackendLink = process.env.REACT_APP_BACKENDLINK;

        const url = `${BackendLink}/addTestimonial`

        // console.log(testimonialUserData);

        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(testimonialUserData)
        })
            .then(res => {
                // console.log('server side response for testimonial', res);
                // window.location.reload(false)
            })

        const Swal = require('sweetalert2')
        Swal.fire({
            position: 'center',
            icon: 'success',
            // title: isSuperAdmin ? `Congratulations ${loggedInUser.displayName}!! Please confirm to add doctor information in your Panel, Thank You!!` : `Congratulations ${loggedInUser.displayName}!! A request is send to the Super Admin to add doctor information to the website!`,
            title: 'Congratulations!! User Testimonials added Successfully!',
            showConfirmButton: false,
            timer: 4500
        })

    };

    const handleUserImgUpload = (e) => {
        // console.log(e.target.files[0]);
        const imageData = new FormData();
        // imageData.set('key', 'eba329da20b6c8d81d975a91b47e61ab');
        imageData.set('key', '6f873b434b5debc1f50d236f35571a75');
        imageData.append('image', e.target.files[0])

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                // console.log(response);
                // console.log(response.data.data.display_url);
                setUserImageURL(response.data.data.display_url);
            })
            .catch(function (error) {
                // console.log(error);
            });
    }


    return (
        <section className="">
            <Sidebar></Sidebar>
            <div className="col-sm-7 col-md-9 col-7 py-5 p-4 pr-5" style={{ position: "absolute", right: 0, backgroundColor: "#F4FDFB" }}>
                <div className="order-component">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-6">

                                <label className='fw-bolder' htmlFor="id">Add ID <span className='text-danger'>*</span></label>
                                <input name="userID" id='id' className="form-control" placeholder="Add ID (ex. user1)" ref={register} required />

                                <label className='fw-bolder pt-3' htmlFor="username">Add User Name <span className='text-danger'>*</span></label>
                                <input name="Username" id='username' className="form-control" placeholder="Add Username" ref={register} required />


                                <label className='fw-bolder pt-3' htmlFor="company">Add Company <span className='text-danger'>*</span></label>
                                <input name="Company" id='company' className="form-control" placeholder="Add Company" ref={register} required />

                                <label className='fw-bolder pt-3' htmlFor="user-img">User Image Upload <span className='text-danger'>*</span></label>
                                <input name="exampleRequired" className="form-control" type="file" onChange={handleUserImgUpload} required />

                            </div>
                            <div className="col-md-6">

                                <label className='fw-bolder' htmlFor="email">Add Email Address</label>
                                <input name="Email" id='email' className="form-control" placeholder="Add Email Address" ref={register} />

                                <label className='fw-bolder pt-3' htmlFor="gender">Add Gender</label>
                                <input name="Gender" id='gender' className="form-control" placeholder="Add Gender" ref={register} />

                                <label className='fw-bolder pt-3' htmlFor="user-comments">User Comments <span className='text-danger'>*</span></label>
                                <textarea rows="4" name="UserComment" id='user-comments' className="form-control" placeholder="Add User Comment" ref={register} required></textarea>

                            </div>
                        </div>


                        <input className="btn btn-info px-4 mt-4" type="submit" />
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddTestimonials;