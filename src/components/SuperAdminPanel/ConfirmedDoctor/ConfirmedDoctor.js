import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import './ConfirmedDoctor.css'
import DoctorPhoto from '../../../Assets/Images/doctor-icon.png'
import Sidebar from '../../Sidebar/Sidebar';
import { UserContext } from '../../../App';

const ConfirmedDoctor = () => {
    const [doctors, setDoctors] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(() => {
        const BackendLink = process.env.REACT_APP_BACKENDLINK;
        fetch(`${BackendLink}/doctorsForConfirmation`)
            .then(res => res.json())
            .then(data => {
                // console.log("Doctors Data from DB : ", data);
                setDoctors(data)
            })
    }, [])


    // new code
    const statusconfirmed = (id) => {
        const inputStatus = 'Confirmed';
        const status = { inputStatus };
        // console.log("confirmed : ", id);

        const BackendLink = process.env.REACT_APP_BACKENDLINK;
        fetch(`${BackendLink}/doctorConfirmed/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(status)

        })
            .then(res => res.json())
            .then(data => {
                // console.log('Updated');
            })
    }

    // const statusOngoing = (id) =>{
    //     const inputStatus = 'Ongoing';
    //     const status = {inputStatus};

    //     const BackendLink = process.env.REACT_APP_BACKENDLINK;
    //     fetch(`${BackendLink}/ongoing/${id}`, {
    //         method: 'PATCH',
    //         headers:{'Content-Type': 'application/json'},
    //         body: JSON.stringify(status)

    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log('Updated');
    //     })
    // }

    const statusPending = (id) => {
        const inputStatus = 'Pending';
        const status = { inputStatus };
        // console.log("pending : ", id);

        const BackendLink = process.env.REACT_APP_BACKENDLINK;
        fetch(`${BackendLink}/doctorPending/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(status)

        })
            .then(res => res.json())
            .then(data => {
                // console.log('Updated');
            })
    }

    return (
        <div className=''>
            {/* <Navbar></Navbar> */}
            <Sidebar></Sidebar>
            <div className="confirmed-doctor-container">
                <div className="col-sm-7 col-md-9 col-7 py-3 p-2 pr-5 m-auto table-responsive-lg" style={{ position: "absolute", right: 0, backgroundColor: "#F4FDFB" }}>
                    <table align="center" cellPadding="15" width="80%" className='table table-success table-striped table-hover'>
                        <thead className='table-info'>
                            <tr>
                                {/* <th className='px-4'>item index</th> */}
                                <th className='px-4'>DoctorDetails</th>
                                {/* <th className='px-4'>Designation</th> */}
                                {/* <th className='px-4'>Degree</th> */}
                                {/* <th className='px-4'>Department</th> */}
                                {/* <th className='px-4'>Chamber</th> */}
                                {/* <th className='px-4'>Time</th> */}
                                {/* <th className='px-4'>OffDay</th> */}
                                <th className='px-4'>DoctorPhoto</th>
                                <th className='px-4'>DoctorNID</th>
                                <th className='px-4'>AddedBy</th>
                                <th className='px-4'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                doctors.map((doctorsInfo, index) => {
                                    return (
                                        <tr key={index}>
                                            {/* <td className='px-4'>{index + 1}</td> */}
                                            <td className='px-4'><span className='text-primary fw-bolder'>{doctorsInfo.Doctor_Name}</span> <br /><span>{doctorsInfo.Designation} ({doctorsInfo.Doctor_BMDC_Reg}) , <span className='text-info bg-light fw-bold px-2'>{doctorsInfo.Department}</span></span><br /><span>{doctorsInfo.Degree}</span><br /><span className='text-info bg-dark fw-bolder'>{doctorsInfo.Chamber}</span><br /><span className='text-danger fw-bolder'>OffDay : {doctorsInfo.OffDay}</span></td>
                                            {/* <td className='px-4'>{doctorsInfo.Designation} {doctorsInfo.Doctor_BMDC_Reg}</td> */}
                                            {/* <td className='px-4'>{doctorsInfo.Degree}</td> */}
                                            {/* <td className='px-4'>{doctorsInfo.Department}</td> */}
                                            {/* <td className='px-4'><span className='text-info bg-dark fw-bolder'>{doctorsInfo.Chamber}</span></td> */}
                                            {/* <td className='px-4'>{doctorsInfo.Time}</td> */}
                                            {/* <td className='px-4'><span className='text-danger bg-light px-3 py-1 fw-bolder'>{doctorsInfo.OffDay}</span></td> */}
                                            <td className='px-4'><img src={doctorsInfo.doctorImageURL ? doctorsInfo.doctorImageURL : DoctorPhoto} className='doctor-img' alt="" /></td>

                                            <td className='px-4'><img src={doctorsInfo.doctorNidURL} alt="" className='doctor-nid-img' alt="" /></td>

                                            <td className='px-4'><span>{doctorsInfo.Doctor_Added_by}</span><br /><span>{doctorsInfo.Doctor_Added_date}</span></td>

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