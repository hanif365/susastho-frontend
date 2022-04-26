import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Sidebar from '../../Sidebar/Sidebar';

const AddHealthTips = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [imageURL, setImageURL] = useState(null);

    const onSubmit = data => {
        const healthTipsData = {
            Health_Tips_Title: data.Health_Tips_Title,
            Description: data.Description,
            imageURL: imageURL,
            Published_Date: data.Published_Date,
            Writer_Name: data.Writer_Name,
            Company: data.Company,
            Link: data.Link,
            Health_Tips_Added_date: (new Date().getUTCDate()) + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getUTCFullYear())
        };

        const BackendLink = process.env.REACT_APP_BACKENDLINK;
        const url = `${BackendLink}/addhealthtips`

        // console.log(healthTipsData);

        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(healthTipsData)
        })
            .then(res => {
                // console.log('server side response', res)
                // window.location.reload(false)
            })

        const Swal = require('sweetalert2')
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Congratulations!! Health Tips Data Successfully inserted into Database.',
            showConfirmButton: false,
            Published_Dater: 1500
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
                                <label className='fw-bolder' htmlFor="title">Add Health Tips Title <span className='text-danger'>*</span></label>
                                <input name="Health_Tips_Title" id='title' className="form-control" placeholder="Add Health Tips Title" ref={register} required />

                                <label className='fw-bolder pt-3' htmlFor="Description">Add Description <span className='text-danger'>*</span></label>
                                <input name="Description" id='Description' className="form-control" placeholder="Add Description" ref={register} required />

                                <label className='fw-bolder pt-3' htmlFor="WriterName">Add Writer Name <span className='text-danger'>*</span></label>
                                <input name="Writer_Name" id='WriterName' className="form-control" placeholder="Add Writer Name" ref={register} required />

                                <label className='fw-bolder pt-3' htmlFor="Company">Add Company</label>
                                <input name="Company" id='Company' className="form-control" placeholder="Add Company" ref={register} />

                            </div>
                            <div className="col-md-6">
                                <label className='fw-bolder' htmlFor="Link">Add Link <span className='text-danger'>*</span></label>
                                <input name="Link" id='Link' className="form-control" placeholder="Link" ref={register} required />

                                <label className='fw-bolder pt-3' htmlFor="PublishedDate">Add Published Date <span className='text-danger'>*</span></label>
                                <input name="Published_Date" id='PublishedDate' className="form-control" placeholder="Add Published Date" ref={register} required />

                                <label className='fw-bolder pt-3' htmlFor="doc-img">Image Upload <span className='text-danger'>*</span></label>
                                <input name="exampleRequired" className="form-control" type="file" onChange={handleImgUpload} required/>
                            </div>
                        </div>


                        <input className="btn btn-info px-4 mt-4" type="submit" />
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddHealthTips;