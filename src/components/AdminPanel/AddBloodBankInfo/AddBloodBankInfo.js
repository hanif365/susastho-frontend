import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from "react-multi-date-picker";
import Sidebar from '../../Sidebar/Sidebar';

const AddBloodBankInfo = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [imageURL, setImageURL] = useState(null);

    const [value, setValue] = useState(new Date());
    const date = value?.toDate?.().toString();
    console.log(date)

    const onSubmit = data => {
        const bloodBankInfo = {
            BloodDonor_Name: data.BloodDonor_Name,
            Address: data.Address,
            Mobile_Number: data.Mobile_Number,
            Donor_Email: data.Donor_Email,
            Donor_Photo: imageURL,
            Last_BloodDonation_Date: value?.toDate?.().toString(),
        };

        // const url = `https://polar-bastion-39307.herokuapp.com/addService`
        const url = `http://localhost:5000/addbloodbankinfo`
        // console.log(data)

        console.log(bloodBankInfo);

        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bloodBankInfo)
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
                            <input name="BloodDonor_Name" className="form-control" placeholder="Add Blood Donor Name" ref={register} />

                            <input name="Address" className="form-control" placeholder="Add Address" ref={register} />

                            <input name="Mobile_Number" className="form-control" placeholder="Add Mobile Number" ref={register} />

                            <input name="Donor_Email" className="form-control" placeholder="Add Donor Email" ref={register} />

                            <label className='fw-bolder pt-5 me-3' htmlFor="lbd-date">Last Blood Donation Date <span className='text-danger'>*</span></label>
                                <DatePicker className='date-picker' value={value} id='lbd-date' format="YYYY/MM/DD" onChange={setValue} required />

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

export default AddBloodBankInfo;