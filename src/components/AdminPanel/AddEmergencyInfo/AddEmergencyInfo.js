import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Sidebar from '../../Sidebar/Sidebar';

const AddEmergencyInfo = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [imageURL, setImageURL] = useState(null);

    const onSubmit = data => {
        const emergencyInfo = {
            Hospital_Name: data.Hospital_Name,
            Address: data.Address,
            Mobile_Number: data.Mobile_Number,
            Contact_For_Ambulance: data.Contact_For_Ambulance,
            hospitalURL: imageURL,
            Hospital_Email: data.Hospital_Email,
            Hospital_Website: data.Hospital_Website,
            EmergencyInfo_Added_date: (new Date().getUTCDate()) + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getUTCFullYear())
        };

        // const url = `https://polar-bastion-39307.herokuapp.com/addService`
        const url = `https://sleepy-fjord-79948.herokuapp.com/addemergencyinfo`
        // console.log(data)

        // console.log(emergencyInfo);

        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(emergencyInfo)
        })
            .then(res => {
                // console.log('server side response', res)
                // window.location.reload(false)
            })

            const Swal = require('sweetalert2')
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Congratulations!! Emergency Info Successfully inserted into the Database.',
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
        <section className="">
            <Sidebar></Sidebar>
            <div className="col-sm-7 col-md-9 col-7 py-5 p-4 pr-5" style={{ position: "absolute", right: 0, backgroundColor: "#F4FDFB" }}>
                <div className="order-component">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-6">
                                <label className='fw-bolder' htmlFor="h-name">Add Hospital Name <span className='text-danger'>*</span></label>
                                <input name="Hospital_Name" id='h-name' className="form-control" placeholder="Add Hospital Name" ref={register} required />

                                <label className='fw-bolder mt-3' htmlFor="address">Add Address <span className='text-danger'>*</span></label>
                                <input name="Address" id='address' className="form-control" placeholder="Add Address" ref={register} required />

                                <label className='fw-bolder mt-3' htmlFor="mobile">Add Mobile Number <span className='text-danger'>*</span></label>
                                <input name="Mobile_Number" id='mobile' className="form-control" placeholder="Add Mobile Number" ref={register} required />

                                <label className='fw-bolder mt-3' htmlFor="photo">Upload Hospital Photo</label>
                                <input name="exampleRequired" className="form-control" type="file" onChange={handleImgUpload} />
                            </div>
                            <div className="col-md-6">
                                <label className='fw-bolder' htmlFor="ambu">Contact For Ambulance <span className='text-danger'>*</span></label>
                                <input name="Contact_For_Ambulance" id='ambu' className="form-control" placeholder="Contact For Ambulance" ref={register} required/>

                                <label className='fw-bolder mt-3' htmlFor="web">Hospital Website <span className='text-danger'>*</span></label>
                                <input name="Hospital_Website" id='web' className="form-control" placeholder="Hospital Website" ref={register} required />

                                <label className='fw-bolder mt-3' htmlFor="email">Add Hospital Email</label>
                                <input name="Hospital_Email" id='email' className="form-control" placeholder="Hospital Email" ref={register} />
                            </div>
                        </div>


                        <input className="btn btn-info px-4 my-3" type="submit" />
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddEmergencyInfo;