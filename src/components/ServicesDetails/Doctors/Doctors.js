import React, { useEffect, useState } from 'react';
import './Doctors.css';
// import AllDoctorsData from '../../../Assets/Data/DoctorsData.json';
import DoctorList from '../DoctorList/DoctorList';
import Navbar from '../../Shared/Navbar/Navbar';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/doctors')
            .then(res => res.json())
            .then(data => {
                console.log("Doctors Data from DB : ", data);
                setDoctors(data)
            })
    }, [])


    // console.log(AllDoctorsData);

    // const DoctorsData = AllDoctorsData.slice(0, 6);
    // console.log(DoctorsData)
    return (
        <div className="container doctors-container ">
            <Navbar></Navbar>
            <div className="row">
                <div className="col-12">
                    {/* <h1>Doctors List</h1> */}
                    <div className="row row-cols-1 row-cols-md-3">
                        {
                            doctors.map(doctor => <DoctorList doctor={doctor}></DoctorList>)
                        }
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Doctors;