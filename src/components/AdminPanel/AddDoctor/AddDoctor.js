import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Sidebar from '../../Sidebar/Sidebar';

const AddDoctor = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [imageURL, setImageURL] = useState(null);

    const onSubmit = data => {
        const doctorData = {
            Doctor_Name: data.Doctor_Name,
            Designation: data.Designation,
            Degree: data.Degree,
            Department: data.Department,
            imageURL: imageURL,
            Chamber: data.Chamber,
            Time: data.Time,
            OffDay: data.OffDay,
            Fees: data.Fees,
            Doctor_Description: data.Doctor_Description,
            Doctor_Added_date: (new Date().getUTCDate()) + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getUTCFullYear())
        };

        // const url = `https://polar-bastion-39307.herokuapp.com/addService`
        const url = `http://localhost:5000/addDoctor`
        // console.log(data)

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

    };

    const handleImgUpload = (e) => {
        console.log(e.target.files[0]);
        const imageData = new FormData();
        // imageData.set('key', 'eba329da20b6c8d81d975a91b47e61ab');
        imageData.set('key', '6f873b434b5debc1f50d236f35571a75');
        imageData.append('image', e.target.files[0])

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                // console.log(response);
                console.log(response.data.data.display_url);
                setImageURL(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <section className="">
            <Sidebar></Sidebar>
            <div className="col-9 py-5 my-5 p-4 pr-5" style={{ position: "absolute", right: 0, backgroundColor: "#F4FDFB" }}>
                <div className="order-component">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-6">
                                <input name="Doctor_Name" className="form-control" placeholder="Add Doctor Name" ref={register} />

                                <input name="Designation" className="form-control" placeholder="Add Designation" ref={register} />

                                <input name="Degree" className="form-control" placeholder="Add Degree" ref={register} />

                                <input name="Department" className="form-control" placeholder="Add Department" ref={register} />

                                <input name="exampleRequired" className="my-5 form-control" type="file" onChange={handleImgUpload} />
                            </div>
                            <div className="col-md-6">
                                <input name="Chamber" className="form-control" placeholder="Chamber" ref={register} />
                                <input name="Time" className="form-control" placeholder="Time" ref={register} />
                                <input name="OffDay" className="form-control" placeholder="Off Day" ref={register} />
                                <input name="Fees" className="form-control" placeholder="Add Fees" ref={register} />

                                <input name="Doctor_Description" className="my-5 form-control" placeholder="Add Doctor Description" ref={register} />

                            </div>
                        </div>


                        <input className="btn btn-info ps-4 w-25" type="submit" />
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddDoctor;