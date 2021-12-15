import React from 'react';
import { useForm } from 'react-hook-form';
import Sidebar from '../../Sidebar/Sidebar';
import './MakeSuperAdmin.css'

const MakeSuperAdmin = () => {
    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmitAdmin = (datalist) => {
        const adminData = {
            Super_Admin_Name: datalist.Super_Admin_Name,
            email: datalist.email,
            Admin_Added_Date: (new Date().getUTCDate()) + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getUTCFullYear())
        };

        const adminURL = `https://sleepy-fjord-79948.herokuapp.com/addSuperAdmin`

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
            title: 'Amazing!! Super Admin created Successfully and save in the Database.',
            showConfirmButton: false,
            timer: 1500
        })
    }
    return (
        <section className="">
            <Sidebar></Sidebar>
            <div className="col-9 py-5 p-4 pr-5" style={{ position: "absolute", right: 0, backgroundColor: "#F4FDFB" }}>
                <div className="my-3 order-component">
                    <form onSubmit={handleSubmit(onSubmitAdmin)}>
                        <div className="row">
                            <div className="col">
                                <label className='fw-bolder' htmlFor="super-admin-name">Add Admin Name <span className='text-danger'>*</span></label>
                                <input name="Super_Admin_Name" id='super-admin-name' className="form-control" placeholder="Add Super Admin Name" ref={register} required />

                                <label className='fw-bolder mt-4' htmlFor="email">Add Email Address <span className='text-danger'>*</span></label>
                                <input name="email" id='email' className="form-control mb-4" placeholder="Add Super Admin Email" ref={register} required />
                            </div>
                        </div>
                        <input className="btn btn-info ps-4 w-25" type="submit" />
                    </form>
                </div>

            </div>
        </section>
    );
};

export default MakeSuperAdmin;