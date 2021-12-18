import React, { useEffect, useState } from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import './ConfirmedDoctor.css'
import DoctorPhoto from '../../../Assets/Images/doctor-icon.png'
import Sidebar from '../../Sidebar/Sidebar';

const ConfirmedDoctor = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetch('https://sleepy-fjord-79948.herokuapp.com/doctorsForConfirmation')
            .then(res => res.json())
            .then(data => {
                console.log("Doctors Data from DB : ", data);
                setDoctors(data)
            })
    }, [])


    // new code
    const statusconfirmed = (id) =>{
        const inputStatus = 'Confirmed';
        const status = {inputStatus};
        console.log("confirmed : ", id);
        fetch(`https://sleepy-fjord-79948.herokuapp.com/doctorConfirmed/${id}`, {
            method: 'PATCH',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(status)

        })
        .then(res => res.json())
        .then(data => {
            console.log('Updated');
        })
    }

    // const statusOngoing = (id) =>{
    //     const inputStatus = 'Ongoing';
    //     const status = {inputStatus};
    //     fetch(`https://sleepy-fjord-79948.herokuapp.com/ongoing/${id}`, {
    //         method: 'PATCH',
    //         headers:{'Content-Type': 'application/json'},
    //         body: JSON.stringify(status)

    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log('Updated');
    //     })
    // }

    const statusPending = (id) =>{
        const inputStatus = 'Pending';
        const status = {inputStatus};
        console.log("pending : ", id);
        fetch(`https://sleepy-fjord-79948.herokuapp.com/doctorPending/${id}`, {
            method: 'PATCH',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(status)

        })
        .then(res => res.json())
        .then(data => {
            console.log('Updated');
        })
    }

    return (
        <div className=''>
            {/* <Navbar></Navbar> */}
            <Sidebar></Sidebar>
            <div className="">
                <div className="col-9 py-3 p-2 pr-5 m-auto" style={{ position: "absolute", right: 0, backgroundColor: "#F4FDFB" }}>
                    <table align="center" cellPadding="15" width="80%" className='table table-success table-striped table-hover'>
                        <thead >
                            <tr>
                                {/* <th className='px-4'>item index</th> */}
                                <th className='px-4'>DoctorName</th>
                                <th className='px-4'>Designation</th>
                                <th className='px-4'>Degree</th>
                                {/* <th className='px-4'>Department</th> */}
                                <th className='px-4'>Chamber</th>
                                <th className='px-4'>Time</th>
                                <th className='px-4'>OffDay</th>
                                <th className='px-4'>Photo</th>
                                <th className='px-4'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                doctors.map((doctorsInfo, index) => {
                                    return (
                                        <tr key={index}>
                                            {/* <td className='px-4'>{index + 1}</td> */}
                                            <td className='px-4'>{doctorsInfo.Doctor_Name}</td>
                                            <td className='px-4'>{doctorsInfo.Designation}</td>
                                            <td className='px-4'>{doctorsInfo.Degree}</td>
                                            {/* <td className='px-4'>{doctorsInfo.Department}</td> */}
                                            <td className='px-4'>{doctorsInfo.Chamber}</td>
                                            <td className='px-4'>{doctorsInfo.Time}</td>
                                            <td className='px-4'>{doctorsInfo.OffDay}</td>
                                            <td className='px-4'><img src={doctorsInfo.imageURL ? doctorsInfo.imageURL : DoctorPhoto} className='donor-img' alt="" /></td>

                                            <td>

                                                {doctorsInfo.status === "Confirmed" ? <button onClick={() => statusPending(doctorsInfo._id)} className="btn btn-warning">PENDING</button> :
                                            
                                                <button onClick={() => statusconfirmed(doctorsInfo._id)} className="btn btn-success mt-2 px-3">CONFIRM</button>}

                                            </td>
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

export default ConfirmedDoctor;