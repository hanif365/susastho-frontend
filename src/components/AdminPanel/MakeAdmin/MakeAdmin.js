import React from 'react';
import { useForm } from "react-hook-form";
import Sidebar from '../../Sidebar/Sidebar';

const MakeAdmin = () => {
    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmitAdmin = (datalist) => {
        const AccessTokenForA = process.env.REACT_APP_ACCESSTOKENFORA;

        if (datalist.AccessToken !== AccessTokenForA) {
            warningMsg();
            return;
        }


        const adminData = {
            Admin_Name: datalist.Admin_Name,
            email: datalist.email,
            Admin_Added_Date: (new Date().getUTCDate()) + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getUTCFullYear())
        };

        const BackendLink = process.env.REACT_APP_BACKENDLINK;
        const adminURL = `${BackendLink}/addAdmin`

        // console.log(adminData);

        fetch(adminURL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(adminData)
        })
            .then(res => {
                // console.log('server side response', res)
                // window.location.reload(false)
            })

        const Swal = require('sweetalert2')
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Amazing!! Admin created Successfully and save in the Database.',
            showConfirmButton: false,
            timer: 1500
        })
    }

    const warningMsg = () => {
        const Swal = require('sweetalert2')
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Please make sure your access token!',
            showConfirmButton: false,
            timer: 2000
        })
    }

    return (
        <section className="">
            <Sidebar></Sidebar>
            <div className="col-sm-7 col-md-9 col-7 py-5 p-4 pr-5" style={{ position: "absolute", right: 0, backgroundColor: "#F4FDFB" }}>
                <div className="my-3 order-component">
                    <form onSubmit={handleSubmit(onSubmitAdmin)}>
                        <div className="row">
                            <div className="col">
                                <label className='fw-bolder' htmlFor="admin-name">Add Admin Name <span className='text-danger'>*</span></label>
                                <input name="Admin_Name" id='admin-name' className="form-control" placeholder="Add Admin Name" ref={register} required />

                                <label className='fw-bolder mt-4' htmlFor="email">Add Email Address <span className='text-danger'>*</span></label>
                                <input name="email" id='email' className="form-control mb-4" placeholder="Add Admin Email" ref={register} required />

                                <label className='fw-bolder mt-4' htmlFor="password">Give Access Token <span className='text-danger'>*</span></label>
                                <input name="AccessToken" type="password" id='password' className="form-control mb-4" placeholder="Give Access Token" ref={register} required />
                            </div>
                        </div>
                        <input className="btn btn-info px-4" type="submit" />
                    </form>
                </div>

            </div>
        </section>
    );
};

export default MakeAdmin;