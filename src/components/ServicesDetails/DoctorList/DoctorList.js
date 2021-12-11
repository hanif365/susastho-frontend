import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DoctorContext } from '../../../App';
import './DoctorList.css'

const DoctorList = ({ doctor }) => {
    // const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [selectedDoctor, setSelectedDoctor] = useContext(DoctorContext);
    const { Doctor_Name, Designation, imageURL, Degree, Department, Chamber, Time, Fees, OffDay, Doctor_Description } = doctor;
    console.log("Doctor Name :", Doctor_Name);

    const handleDoctor = () => {
        const setDoctor = {
            name: Doctor_Name,
        }
        setSelectedDoctor(setDoctor);
    }
    return (
        <div className="col g-4">
            <div class="card doctorlist-card">
                <img src={imageURL} class="card-img-top" alt="..." />
                <div class="doctorlist-card-body">
                    <h5 class="card-title">{Doctor_Name}</h5>
                    <p class="card-text">{Designation}</p>
                    <p class="card-text">{Department}</p>
                    <p class="card-text">Degree : {Degree}</p>
                    <p class="card-text">Chamber : {Chamber} <span>({Time})</span> <span className="text-danger"> Off-day : {OffDay}</span></p>
                    <Link to="/addappointment" onClick={() => handleDoctor()} class="btn btn-primary">GET APPOINTMENT</Link>
                    {/* <a href="#" onClick={() => handleDoctor()} class="btn btn-primary">GET APPOINTMENT</a> */}
                </div>
            </div>
        </div>
    );
};

export default DoctorList;