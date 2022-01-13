import React, { useContext, useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import { UserContext } from '../../../App';
import Sidebar from '../../Sidebar/Sidebar';
import AppointmentPatientsList from '../AppointmentPatientsList/AppointmentPatientsList';
import './AppointmentPatients.css'

const AppointmentPatients = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [appointmentpatients, setAppointmentpatients] = useState([]);

    useEffect(() => {
        fetch('https://sleepy-fjord-79948.herokuapp.com/appointmentpatients?email=' + loggedInUser.email)
            .then(res => res.json())
            .then(data => {
                // console.log("Appointment Patients Data from DB : ", data);
                // setAppointmentpatients(data);
                (data.length <= 0) ? showNotificationForAppointmentNone() : setAppointmentpatients(data)
            })
    }, [])

    const showNotificationForAppointmentNone = () => {
        const Swal = require('sweetalert2')
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'You have no Appointment Patient!!',
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
                        appointmentpatients.map(appointmentpatient => <AppointmentPatientsList appointmentpatient={appointmentpatient}></AppointmentPatientsList>)
                    }
                </div>
            </div>
        </div>
    </section>
    );
};

export default AppointmentPatients;