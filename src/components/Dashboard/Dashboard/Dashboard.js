import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import Sidebar from '../../Sidebar/Sidebar';
import './Dashboard.css'

// const containerStyle = {
//     backgroundColor: "#6E3CBC",
//     border: '1px solid red'
// }

const Dashboard = () => {
    return (
        <>
            {/* <div style={containerStyle} className="row"> */}
            <div className="dashboard-main">
                <div className="col-md-2 col-sm-6 col-12">
                    <Sidebar></Sidebar>
                </div>
            </div>
            {/* <Footer></Footer> */}
        </>
    );
};

export default Dashboard;