import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../App';
import Sidebar from '../../Sidebar/Sidebar';

const AddDoctor = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const { register, handleSubmit, watch, errors } = useForm();
    const [doctorImageURL, setDoctorImageURL] = useState(null);
    const [doctorNidURL, setDoctorNidURL] = useState(null);

    // Check admin super-admin or not
    useEffect(() => {
        fetch('https://sleepy-fjord-79948.herokuapp.com/isSuperAdmin', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => setIsSuperAdmin(data));
    }, [])


    const onSubmit = data => {
        const doctorData = {
            Doctor_Name: data.Doctor_Name,
            Designation: data.Designation,
            Degree: data.Degree,
            Department: data.Department,
            doctorImageURL: doctorImageURL,
            doctorNidURL: doctorNidURL,
            Doctor_BMDC_Reg: data.Doctor_BMDC_Reg,
            Chamber: data.Chamber,
            Time: data.Time,
            OffDay: data.OffDay,
            Fees: data.Fees,
            Doctor_Description: data.Doctor_Description,
            Doctor_Added_by: loggedInUser.name,
            Doctor_Added_date: (new Date().getUTCDate()) + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getUTCFullYear()),
            status: "pending",
        };

        const url = `https://sleepy-fjord-79948.herokuapp.com/addDoctor`

        console.log(doctorData);

        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(doctorData)
        })
            .then(res => {
                console.log('server side response', res)
                // window.location.reload(false)
            })

        const Swal = require('sweetalert2')
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: isSuperAdmin ? `Congratulations ${loggedInUser.name}!! Please confirm to add doctor information in your Panel, Thank You!!` : `Congratulations ${loggedInUser.name}!! A request is send to the Super Admin to add doctor information to the website!`,
            showConfirmButton: false,
            timer: 4500
        })

    };

    const handleDoctorImgUpload = (e) => {
        console.log(e.target.files[0]);
        const imageData = new FormData();
        // imageData.set('key', 'eba329da20b6c8d81d975a91b47e61ab');
        imageData.set('key', '6f873b434b5debc1f50d236f35571a75');
        imageData.append('image', e.target.files[0])

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                // console.log(response);
                console.log(response.data.data.display_url);
                setDoctorImageURL(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleDoctorNIDImgUpload = (e) => {
        console.log(e.target.files[0]);
        const imageData = new FormData();
        // imageData.set('key', 'eba329da20b6c8d81d975a91b47e61ab');
        imageData.set('key', '6f873b434b5debc1f50d236f35571a75');
        imageData.append('image', e.target.files[0])

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                // console.log(response);
                console.log(response.data.data.display_url);
                setDoctorNidURL(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <section className="">
            <Sidebar></Sidebar>
            <div className="col-9 py-5 p-4 pr-5" style={{ position: "absolute", right: 0, backgroundColor: "#F4FDFB" }}>
                <div className="order-component">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-6">
                                <label className='fw-bolder' htmlFor="dt-name">Add Doctor Name <span className='text-danger'>*</span></label>
                                <input name="Doctor_Name" id='dt-name' className="form-control" placeholder="Add Doctor Name" ref={register} required />

                                <label className='fw-bolder pt-3' htmlFor="designation">Add Designation <span className='text-danger'>*</span></label>
                                <input name="Designation" id='designation' className="form-control" placeholder="Add Designation" ref={register} required />

                                <label className='fw-bolder pt-3' htmlFor="degree">Add Degree <span className='text-danger'>*</span></label>
                                <input name="Degree" id='degree' className="form-control" placeholder="Add Degree" ref={register} required />

                                <label className='fw-bolder pt-3' htmlFor="department">Add Department</label>
                                <input name="Department" id='department' className="form-control" placeholder="Add Department" ref={register} />

                                <label className='fw-bolder pt-3' htmlFor="doc-img">Doctor Image Upload</label>
                                <input name="exampleRequired" className="form-control" type="file" onChange={handleDoctorImgUpload} />

                                <label className='fw-bolder pt-3' htmlFor="doc-img">Doctor NID Photo Upload <span className='text-danger'>*</span></label>
                                <input name="exampleRequired" className="form-control" type="file" onChange={handleDoctorNIDImgUpload} />
                            </div>
                            <div className="col-md-6">
                                <label className='fw-bolder' htmlFor="chamber">Add Chamber Location <span className='text-danger'>*</span></label>
                                <input name="Chamber" id='chamber' className="form-control" placeholder="Chamber" ref={register} required />

                                <label className='fw-bolder pt-3' htmlFor="ch-time">Add Chamber Time <span className='text-danger'>*</span></label>
                                <input name="Time" id='ch-time' className="form-control" placeholder="Time" ref={register} required />

                                <label className='fw-bolder pt-3' htmlFor="offday">Add Chamber Off Day <span className='text-danger'>*</span></label>
                                <input name="OffDay" id='offday' className="form-control" placeholder="Off Day" ref={register} required />

                                <label className='fw-bolder pt-3' htmlFor="fee">Add Doctor Fees</label>
                                <input name="Fees" id='fee' className="form-control" placeholder="Add Fees" ref={register} />

                                <label className='fw-bolder pt-3' htmlFor="description">Add Doctor Description</label>
                                <input name="Doctor_Description" id='description' className="form-control" placeholder="Add Doctor Description" ref={register} />

                                <label className='fw-bolder pt-3' htmlFor="docor-bmdc-reg">Add Doctor BMDC Registration <span className='text-danger'>*</span></label>
                                <input name="Doctor_BMDC_Reg" id='docor-bmdc-reg' className="form-control" placeholder="Add Doctor BMDC Registration" ref={register} />

                            </div>
                        </div>


                        <input className="btn btn-info ps-4 w-25 mt-4" type="submit" />
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddDoctor;