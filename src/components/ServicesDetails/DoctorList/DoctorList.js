import React from 'react';
import './DoctorList.css'

const DoctorList = ({ doctor }) => {
    const { id, name, designation, image, degree, address, room, fees, offday, from } = doctor;
    console.log("Doctor Name :", name);
    return (
        <div className="col g-4">
            <div class="card doctorlist-card">
                <img src={image} class="card-img-top" alt="..." />
                <div class="doctorlist-card-body">
                    <h5 class="card-title">{name}</h5>
                    <p class="card-text">{designation}</p>
                    <p class="card-text">Degree : {degree}</p>
                    <p class="card-text">Chamber : {address} <span>({from})</span> <span className="text-danger"> Off-day : {offday}</span></p>
                    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                </div>
            </div>
        </div>
    );
};

export default DoctorList;