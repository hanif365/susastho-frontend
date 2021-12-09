import React from 'react';
import './Doctors.css';
import AllDoctorsData from '../../../Assets/Data/DoctorsData.json';
import DoctorList from '../DoctorList/DoctorList';

const Doctors = () => {
    console.log(AllDoctorsData);

    const DoctorsData = AllDoctorsData.slice(0, 6);
    console.log(DoctorsData)
    return (
        <div className="container doctors-container ">
            <div className="row">
                <div className="col-12">
                    {/* <h1>Doctors List</h1> */}
                    <div className="row row-cols-1 row-cols-md-3">
                        {
                            DoctorsData.map(doctor => <DoctorList key={doctor.id} doctor={doctor}></DoctorList>)
                        }
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Doctors;