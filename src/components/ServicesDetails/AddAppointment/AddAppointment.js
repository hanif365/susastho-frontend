import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DoctorContext, UserContext } from '../../../App';
import Navbar from '../../Shared/Navbar/Navbar';
import DatePicker from "react-multi-date-picker";
import './AddAppointment.css';

const AddAppointment = () => {
    const [selectedDoctor, setSelectedDoctor] = useContext(DoctorContext);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const { register, handleSubmit, watch, errors } = useForm();
    const [imageURL, setImageURL] = useState(null);

    const [value, setValue] = useState(new Date());
    const date = value?.toDate?.().toString();
    console.log(date)

    const onSubmit = data => {
        const patientData = {
            Patient_Name: data.Patient_Name,
            Gender: data.Gender,
            Age: data.Age,
            Patient_Image: imageURL,
            Patient_Description: data.Patient_Description,
            Address: data.Address,
            Mobile: data.Mobile,
            Selected_Doctor: data.Selected_Doctor,
            Appointment_Date: value?.toDate?.().toString(),
            User_Name: loggedInUser?.name,
            User_Email: loggedInUser?.email,
            // Serial_Number: Math.random() * 10,
        };

        // const url = `https://polar-bastion-39307.herokuapp.com/addService`
        const url = `http://localhost:5000/addAppointment`
        // console.log(data)

        console.log(patientData);

        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(patientData)
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

    const successMsg = () => {
        alert(`Congratulatations!! You have successfully confirmed your appointment! Your Selected Doctor Name ${selectedDoctor.name} `)
    }
    return (
        <section className="py-5 my-5">
            {/* <Sidebar></Sidebar> */}
            <Navbar></Navbar>
            {/* {value?.toDate?.().toString()}
            {selectedDoctor.name} */}
            <div className="col-12 py-5 my-5 p-4 pr-5" style={{ position: "absolute", right: 0, backgroundColor: "#F4FDFB" }}>
                <div className="order-component">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-6">
                                <input name="Patient_Name" className="form-control" placeholder="Add Patient Name" ref={register} />

                                <input name="Gender" className="form-control" placeholder="Gender" ref={register} />

                                <input name="Age" className="form-control" placeholder="Age" ref={register} />

                                <label className='mt-5 ' htmlFor="patient-img">Patient Image (optional)</label>
                                <input name="exampleRequired" className="form-control" type="file" onChange={handleImgUpload} />
                            </div>
                            <div className="col-md-6">
                                <input name="Address" className="form-control" placeholder="Address" ref={register} />
                                <input name="Mobile" className="form-control" placeholder="Mobile" ref={register} />
                                <input name="Selected_Doctor" value={selectedDoctor.name} className="form-control" placeholder="" ref={register} />

                                <DatePicker value={value} format="YYYY/MM/DD" onChange={setValue} />

                                {/* <input type="date"  name="date" id="" /> */}

                                <input name="Patient_Description" className="my-5 form-control" placeholder="Add Patient Description" ref={register} />

                            </div>
                        </div>


                        <input onClick={() => successMsg()} className="btn btn-info ps-4 w-25" type="submit" value="Confirm" />
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddAppointment;