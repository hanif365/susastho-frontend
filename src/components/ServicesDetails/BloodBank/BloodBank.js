import React, { useEffect, useState } from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import './BloodBank.css'
import BloodDonorPhoto from '../../../Assets/Images/blood-donor.png'

const BloodBank = () => {
    const [bloodBankInfo, setBloodBankInfo] = useState([]);

    useEffect(() => {
        fetch('https://sleepy-fjord-79948.herokuapp.com/bloodBankInfo')
            .then(res => res.json())
            .then(data => {
                console.log("Emergency Info from DB : ", data);
                setBloodBankInfo(data)
            })
    }, [])
    return (
        <div className=''>
        <Navbar></Navbar>
        <div className="bloodBank-field">
            <div className="col-12 m-auto">
                <table align="center" cellPadding="15" width="80%" className='table table-success table-striped table-hover'>
                    <thead >
                        <tr>
                            {/* <th className='px-4'>item index</th> */}
                            <th className='px-4'>DonorName</th>
                            <th className='px-4'>Donor Address</th>
                            <th className='px-4'>ContactNumber</th>
                            <th className='px-4'>Donor Email</th>
                            <th className='px-4'>Last Blood Donation Date (LBDB)</th>
                            <th className='px-4'>DonorPhoto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bloodBankInfo.map((itemDetails, index) => {
                                return (
                                    <tr key={index}>
                                        {/* <td className='px-4'>{index + 1}</td> */}
                                        <td className='px-4'>{itemDetails.BloodDonor_Name}</td>
                                        <td className='px-4'>{itemDetails.Address}</td>
                                        <td className='px-4'>{itemDetails.Mobile_Number}</td>
                                        <td className='px-4'>{itemDetails.Donor_Email}</td>
                                        <td className='px-4'>{itemDetails.Last_BloodDonation_Date}</td>
                                        <td className='px-4'><img src={itemDetails.Donor_Photo ? itemDetails.Donor_Photo : BloodDonorPhoto} className='donor-img' alt="" /></td>
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

export default BloodBank;