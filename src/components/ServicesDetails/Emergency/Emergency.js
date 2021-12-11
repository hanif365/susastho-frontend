import React, { useEffect, useState } from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import './Emergency.css'

const Emergency = () => {
    const emergencyData = [
        {
            Hospital_Name:"BRB Hospital",
            Address:"Dhaka",
            Mobile_Number: "014",
            Contact_For_Ambulance: "012454"
            
        },
        {
            Hospital_Name:"Applo",
            Address:"Dhaka1",
            Mobile_Number: "545",
            Contact_For_Ambulance: "545445"
            
        },
        {
            Hospital_Name:"Ibn Sina",
            Address:"Dhaka2",
            Mobile_Number: "54524",
            Contact_For_Ambulance: "545452445"
            
        },
       
       
    ]

    const [emergencyInfo, setEmergencyInfo] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/emergencyInfo')
            .then(res => res.json())
            .then(data => {
                console.log("Emergency Info from DB : ", data);
                setEmergencyInfo(data)
            })
    }, [])
    return (
        <div className=''>
            <Navbar></Navbar>
            <div className="row emergency-field">
                <div className="col-11 m-auto ">
                    <table align="center" cellPadding="15" width="80%" className='table table-success table-striped table-hover'>
                        <thead >
                            <tr>
                                {/* <th className='px-4'>item index</th> */}
                                <th className='px-4'>Hospital Name</th>
                                <th className='px-4'>Address</th>
                                <th className='px-4'>Contact Number</th>
                                <th className='px-4'>Hospital Email</th>
                                <th className='px-4'>Hospital Website</th>
                                <th className='px-4'>Contact For Ambulance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                emergencyInfo.map((itemDetails, index) =>{
                                    return(
                                        <tr key={index}>
                                            {/* <td className='px-4'>{index + 1}</td> */}
                                            <td className='px-4'>{itemDetails.Hospital_Name}</td>
                                            <td className='px-4'>{itemDetails.Address}</td>
                                            <td className='px-4'>{itemDetails.Mobile_Number}</td>
                                            <td className='px-4'>{itemDetails.Hospital_Email}</td>
                                            <td className='px-4'>{itemDetails.Hospital_Website}</td>
                                            <td className='px-4'>{itemDetails.Contact_For_Ambulance}</td>
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

export default Emergency;