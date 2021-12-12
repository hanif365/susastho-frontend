import React, { useEffect, useState } from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import AppointmentList from '../AppointmentList/AppointmentList';
import './Appointment.css'

const Appointment = () => {
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        fetch(`https://sleepy-fjord-79948.herokuapp.com/appointment`)
            .then(res => res.json())
            .then(data => {
                console.log("Appointment Data from DB : ", data);
                setAppointments(data)
            })
    }, [])
    return (
        <section className="">
            <Sidebar></Sidebar>
            <div className="col-9 py-5 my-5 p-4 pr-5" style={{ position: "absolute", right: 0, backgroundColor: "#F4FDFB" }}>
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