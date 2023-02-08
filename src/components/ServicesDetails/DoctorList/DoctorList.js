import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DoctorContext } from '../../../App';
import { AuthContext } from '../../../contexts/UserContext';
import './DoctorList.css'

const DoctorList = ({ doctor }) => {
    // const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { loggedInUser, providerLogin, logOut } = useContext(AuthContext);

    const [selectedDoctor, setSelectedDoctor] = useContext(DoctorContext);
    const {_id, Doctor_Name, Doctor_Email, Designation, doctorImageURL, doctorNidURL, Doctor_BMDC_Reg,  Degree, Department, Chamber, Time, Fees, OffDay, Doctor_Description } = doctor;
    // console.log("Doctor Name :", Doctor_Name);

    const handleDoctor = () => {
        const setDoctor = {
            name: Doctor_Name,
            email: Doctor_Email,
        }
        setSelectedDoctor(setDoctor);
    }
    return (
        <div className="col g-4">
            <div class="card doctorlist-card pb-3">
                <img src={doctorImageURL} class="card-img-top" alt="..." />
                <div class="doctorlist-card-body">
                    <h5 class="card-title">{Doctor_Name}</h5>
                    <p class="card-text">{Designation} ({Doctor_BMDC_Reg})</p>
                    <p class="card-text">Department : {Department}</p>
                    <p class="card-text">Degree : {Degree}</p>
                    <p class="card-text">Chamber : {Chamber} <span>({Time})</span> <span className="text-danger"> Off-day : {OffDay}</span></p>
                    <Link to="/addappointment" onClick={() => handleDoctor()} class="btn btn-field">GET APPOINTMENT</Link>
                    {/* <a href="#" onClick={() => handleDoctor()} class="btn btn-primary">GET APPOINTMENT</a> */}
                </div>
            </div>
        </div>
    );
};

export default DoctorList;