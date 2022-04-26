import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import Sidebar from '../../Sidebar/Sidebar';
import AppointmentList from '../AppointmentList/AppointmentList';
import './Appointment.css'

const Appointment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const BackendLink = process.env.REACT_APP_BACKENDLINK;
        fetch(`${BackendLink}/appointment?email=` + loggedInUser.email)
            .then(res => res.json())
            .then(data => {
                // console.log("Appointment Data from DB : ", data);
                // setAppointments(data);
                (data.length <= 0) ? showNotificationForAppointmentNone() : setAppointments(data)
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
    return (
        <section className="">
            <Sidebar></Sidebar>
            <div className="col-sm-7 col-md-9 col-7 py-5 p-md-4 pr-md-5" style={{ position: "absolute", right: 0, backgroundColor: "#F4FDFB" }}>
                <div className="order-component">
                    <div className="row row-cols-1 row-cols-md-3">
                        {
                            appointments.map(appointment => <AppointmentList appointment={appointment}></AppointmentList>)
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Appointment;