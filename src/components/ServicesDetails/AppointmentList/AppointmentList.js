import React from 'react';
import './AppointmentList.css'

const AppointmentList = ({ appointment }) => {
    const {_id, Patient_Name, Gender, Age, Patient_Image, Patient_Description, Address, Mobile, Selected_Doctor, Appointment_Date, User_Name, User_Email } = appointment;
    // console.log(appointment);

    const cancelAppointment = (id) =>{
        // console.log(id)
        const BackendLink = process.env.REACT_APP_BACKENDLINK;

        fetch(`${BackendLink}/cancelAppointment/${id}`, {
            method: 'DELETE',
        })
            .then(res => {
                res.json();
                // window.location.reload();
            })
            .then(result => {
                // console.log('Deleted successfully');
            })
        // window.location.reload();
    }
    return (
        <div className="col g-4 mx-5">
            <div class="card appointment-card">
                <img src={Patient_Image} class="card-img-top" alt="..." />
                <div class="appointment-card-body pb-4">
                    <h5 class="card-title">Patient Name : {Patient_Name}</h5>
                    <p class="card-text">Selected Doctor : {Selected_Doctor}</p>
                    <p class="card-text">Gender : {Gender} <span> , Age : {Age}</span></p>
                    <p class="card-text">Address : {Address}</p>
                    <p class="card-text">Mobile : {Mobile}</p>
                    <p class="card-text">Appointment_Date : {Appointment_Date}</p>
                    <p class="card-text">Problem Details : {Patient_Description}</p>
                    <p class="card-text">Appointment By : {User_Name}</p>
                    <button className='btn btn-field' onClick={() => cancelAppointment(_id)}>Cancel Appointment</button>
                    
                    {/* <Link to="/addappointment" onClick={() => handleDoctor()} class="btn btn-primary">GET APPOINTMENT</Link> */}
                    {/* <a href="#" onClick={() => handleDoctor()} class="btn btn-primary">GET APPOINTMENT</a> */}
                </div>
            </div>
        </div>
    );
};

export default AppointmentList;