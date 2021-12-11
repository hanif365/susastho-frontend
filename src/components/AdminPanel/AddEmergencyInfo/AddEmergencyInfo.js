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
        const url = `http://localhost:5000/addemergencyinfo`
        // console.log(data)

        console.log(emergencyInfo);

        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(emergencyInfo)
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
                        <div className="col-md-12">
                            <input name="Hospital_Name" className="form-control" placeholder="Add Hospital Name" ref={register} />

                            <input name="Address" className="form-control" placeholder="Add Address" ref={register} />

                            <input name="Mobile_Number" className="form-control" placeholder="Add Mobile Number" ref={register} />

                            <input name="Contact_For_Ambulance" className="form-control" placeholder="Contact For Ambulance" ref={register} />

                            <input name="Hospital_Website" className="form-control" placeholder="Hospital Website" ref={register} />

                            <input name="Hospital_Email" className="form-control" placeholder="Hospital Email" ref={register} />

                            <input name="exampleRequired" className="my-5 form-control" type="file" onChange={handleImgUpload} />
                        </div>
                        {/* <div className="col-md-6">
                            <input name="Chamber" className="form-control" placeholder="Chamber" ref={register} />
                            <input name="Time" className="form-control" placeholder="Time" ref={register} />
                            <input name="OffDay" className="form-control" placeholder="Off Day" ref={register} />
                            <input name="Fees" className="form-control" placeholder="Add Fees" ref={register} />

                            <input name="Doctor_Description" className="my-5 form-control" placeholder="Add Doctor Description" ref={register} />

                        </div> */}
                    </div>


                    <input className="btn btn-info ps-4 w-25" type="submit" />
                </form>
            </div>
        </div>
    </section>
    );
};

export default AddEmergencyInfo;