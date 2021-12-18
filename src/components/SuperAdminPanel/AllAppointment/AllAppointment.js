import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import Sidebar from '../../Sidebar/Sidebar';
import './AllAppointment.css';
import PatientPhoto from '../../../Assets/Images/patientPhoto.jpg'

const AllAppointment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [allAppointments, setAllAppointments] = useState([]);

    useEffect(() => {
        fetch('https://sleepy-fjord-79948.herokuapp.com/allAppointment')
            .then(res => res.json())
            .then(data => {
                console.log("All Appointment Data from DB : ", data);
                // setAllAppointments(data);
                (data.length <= 0) ? showNotificationForAppointmentNone() : setAllAppointments(data)
            })
    }, [])


    const showNotificationForAppointmentNone = () => {
        const Swal = require('sweetalert2')
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'You have no Appointment!! At first get an Appointment.',
            showConfirmButton: false,
            timer: 3500,
            timerProgressBar: true,
        })
    }

    const cancelAppointmentBySuperAdmin = (id) => {
        // console.log(id)

        fetch(`https://sleepy-fjord-79948.herokuapp.com/cancelAppointment/${id}`, {
            method: 'DELETE',
        })
            .then(res => {
                res.json();
                // window.location.reload();
            })
            .then(result => {
                console.log('Deleted successfully')
            })
    }
    return (
        <div className=''>
            {/* <Navbar></Navbar> */}
            <Sidebar></Sidebar>
            <div className="all-apointment-container">
                <div className="col-9 py-3 p-2 pr-5 m-auto" style={{ position: "absolute", right: 0, backgroundColor: "#F4FDFB" }}>
                    <table align="center" cellPadding="15" width="80%" className='table table-success table-striped table-hover'>
                        <thead >
                            <tr>
                                {/* <th className='px-4'>item index</th> */}
                                <th className='px-4'>PatientName</th>
                                <th className='px-4'>Gender</th>
                                {/* <th className='px-4'>Age</th> */}
                                {/* <th className='px-4'>Description</th> */}
                                <th className='px-4'>Address</th>
                                {/* <th className='px-4'>Mobile</th> */}
                                <th className='px-4'>Selected Doctor</th>
                                <th className='px-4'>Appointment Date</th>
                                <th className='px-4'>User Name</th>
                                <th className='px-4'>Patient Photo</th>
                                {/* <th className='px-4'>User Email</th> */}
                                <th className='px-4'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allAppointments.map((patientInfo, index) => {
                                    return (
                                        <tr key={index}>
                                            {/* <td className='px-4'>{index + 1}</td> */}
                                            <td className='px-4'>{patientInfo.Patient_Name}</td>
                                            <td className='px-4'>{patientInfo.Gender} ({patientInfo.Age})</td>
                                            {/* <td className='px-4'>{patientInfo.Age}</td> */}
                                            {/* <td className='px-4'>{patientInfo.Patient_Description}</td> */}
                                            <td className='px-4'>{patientInfo.Address} <br />{patientInfo.Mobile}</td>
                                            {/* <td className='px-4'>{patientInfo.Mobile}</td> */}
                                            <td className='px-4'>{patientInfo.Selected_Doctor}</td>
                                            <td className='px-4'>{patientInfo.Appointment_Date}</td>
                                            <td className='px-4'>{patientInfo.User_Name}</td>
                                            <td className='px-4'><img src={patientInfo.Patient_Image ? patientInfo.Patient_Image : PatientPhoto} className='donor-img' alt="" /></td>
                                            {/* <td className='px-4'>{patientInfo.User_Email}</td> */}

                                            <td className='px-4'>
                                                <button className='btn btn-field mt-4' onClick={() => cancelAppointmentBySuperAdmin(patientInfo._id)}>Cancel</button>
                                            </td>

                                            {/* <td>

                                            {patientInfo.status === "Confirmed" ? <button onClick={() => statusPending(patientInfo._id)} className="btn btn-warning">PENDING</button> :
                                        
                                            <button onClick={() => statusconfirmed(patientInfo._id)} className="btn btn-success mt-2 px-3">CONFIRM</button>}

                                        </td> */}
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default AllAppointment;