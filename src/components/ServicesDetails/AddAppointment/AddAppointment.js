import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DoctorContext, UserContext } from '../../../App';
import Navbar from '../../Shared/Navbar/Navbar';
import DatePicker from "react-multi-date-picker";
import './AddAppointment.css';

import Swal from 'sweetalert2'

// CommonJS



const AddAppointment = () => {
    const [selectedDoctor, setSelectedDoctor] = useContext(DoctorContext);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const { register, handleSubmit, watch, errors } = useForm();
    const [imageURL, setImageURL] = useState(null);

    const [value, setValue] = useState(new Date());
    const date = value?.toDate?.().toString();
    // console.log(date)

    const onSubmit = data => {
        const patientData = {
            Patient_Name: data.Patient_Name,
            Gender: data.Gender,
            Age: data.Age,
            Patient_Image: imageURL,
            Patient_Description: data.Patient_Description,
            Address: data.Address,
            Mobile: data.Mobile,
            Selected_Doctor: selectedDoctor.name,
            Appointment_Date: value?.toDate?.().toString(),
            User_Name: loggedInUser?.name,
            User_Email: loggedInUser?.email,
            // Serial_Number: Math.random() * 10,
        };

        // const url = `https://polar-bastion-39307.herokuapp.com/addService`
        const url = `https://sleepy-fjord-79948.herokuapp.com/addAppointment`
        // console.log(data)

        // console.log("Patient Data : ", patientData);

        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(patientData)
        })
            .then(res => {
                // console.log('server side response', res);
                // window.location.reload(false)
            })


        const Swal = require('sweetalert2')
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Congratulations!! Your appointment successfully reserved.',
            showConfirmButton: false,
            timer: 1500
        })
    };


    const handleImgUpload = (e) => {
        // console.log(e.target.files[0]);
        const imageData = new FormData();
        // imageData.set('key', 'eba329da20b6c8d81d975a91b47e61ab');
        imageData.set('key', '6f873b434b5debc1f50d236f35571a75');
        imageData.append('image', e.target.files[0])

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                // console.log(response);
                // console.log(response.data.data.display_url);
                setImageURL(response.data.data.display_url);
            })
            .catch(function (error) {
                // console.log(error);
            });
    }

    return (
        <section className="py-5 my-5">
            {/* <Sidebar></Sidebar> */}
            <Navbar></Navbar>
            {/* {value?.toDate?.().toString()}
            {selectedDoctor.name} */}
            <div className="col-12 py-5 p-4 pr-5" style={{ position: "absolute", right: 0, backgroundColor: "#F4FDFB" }}>
                <div className="order-component">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-6">
                                <label className='fw-bolder' htmlFor="pt-name">Add Patient Name <span className='text-danger'>*</span></label>
                                <input name="Patient_Name" id="pt-name" className="form-control fw-bolder" placeholder="Add Patient Name" ref={register} required />

                                <label className='fw-bolder pt-3' htmlFor="pt-gender">Gender</label>
                                <input name="Gender" id="pt-gender" className="form-control" placeholder="Gender" ref={register} />

                                <label className='fw-bolder pt-3' htmlFor="pt-age">Age</label>
                                <input name="Age" id="pt-age" className="form-control" placeholder="Age" ref={register} />

                                <label className='fw-bolder pt-3' htmlFor="pt-img">Patient Image</label>
                                <input name="exampleRequired" id="pt-img" className="form-control" type="file" onChange={handleImgUpload} />
                            </div>
                            <div className="col-md-6">
                                <label className='fw-bolder' htmlFor="pt-address">Add Patient Address <span className='text-danger'>*</span></label>
                                <input name="Address" id="pt-address" className="form-control" placeholder="Address" ref={register} required />

                                <label className='fw-bolder pt-3' htmlFor="pt-mobile">Add Patient Mobile Number <span className='text-danger'>*</span></label>
                                <input name="Mobile" id='pt-mobile' className="form-control" placeholder="Mobile" ref={register} required />

                                <label className='fw-bolder pt-3' htmlFor="pt-doctor">Auto Filled Doctors Name <span className='text-danger'>*</span></label>
                                <input name="Selected_Doctor_Just_Used" value={selectedDoctor.name} className="form-control" placeholder="" ref={register} required disabled />

                                <label className='fw-bolder pt-5 me-3' htmlFor="appointment-date">Appointment Date <span className='text-danger'>*</span></label>
                                <DatePicker className='date-picker' value={value} id='appointment-date' format="YYYY/MM/DD" onChange={setValue} />

                                {/* <input name="Patient_Description" className="my-5 form-control" placeholder="Add Patient Description" ref={register} /> */}

                            </div>
                            <textarea name="Patient_Description" className="my-3 px-3 form-control" placeholder="Add Patient Description" ref={register}></textarea>

                        </div>


                        <input className="btn btn-info btn-submit-appointment" type="submit" value="Confirm" />
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddAppointment;