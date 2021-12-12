import React, { useContext, useEffect, useState } from 'react';
import './Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAmbulance, faCalendarCheck, faCommentAlt, faHandHoldingWater, faSignOutAlt, faUserMd, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import Navbar from '../Shared/Navbar/Navbar';

const Sidebar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetch('https://sleepy-fjord-79948.herokuapp.com/isAdmin', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => setIsAdmin(data));
    }, [])

    const showNotification = () => {
        const Swal = require('sweetalert2')
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'You are Logged Out!.',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
        })
    }
    return (
        <div className="sidebar-container">
            <Navbar></Navbar>
            <div className="sidebar d-flex flex-column justify-content-between col-3 py-5 px-4" style={{ height: "100vh" }}>
                <ul className="list-unstyled">
                    {isAdmin && <div>
                        <li>
                            <Link to="/adddoctor" className="text-white">
                                <FontAwesomeIcon icon={faUserMd} /> <span>Add Doctor</span>
                            </Link>
                        </li>


                        <li>
                            <Link to="/makeadmin" className="text-white">
                                <FontAwesomeIcon icon={faUserPlus} /> <span>Make Admin</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/addemergencyinfo" className="text-white">
                                <FontAwesomeIcon icon={faAmbulance} /> <span>Add Emergency Info</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/addbloodbankinfo" className="text-white">
                                <FontAwesomeIcon icon={faHandHoldingWater} /> <span>Add Blood Bank Info</span>
                            </Link>
                        </li>

                    </div>}



                    <li>
                        <Link to="/appointment" className="text-white">
                            <FontAwesomeIcon icon={faCalendarCheck} /> <span>Appointment</span>
                        </Link>
                    </li>


                    {/* <li>
                        <Link to="/addreview" className="text-white">
                            <FontAwesomeIcon icon={faCommentAlt} /> <span>Add Review</span>
                        </Link>
                    </li> */}

                    <li>
                        <Link to="/" onClick={() => { showNotification(); setLoggedInUser({}) }} className="logout text-danger fw-bold"><FontAwesomeIcon icon={faSignOutAlt} /> <span>LOG OUT</span></Link>
                    </li>
                </ul>
                {/* <div>
                    <Link to="/" onClick={() => setLoggedInUser({})} className="text-danger"><FontAwesomeIcon icon={faSignOutAlt} /> <span>Logout</span></Link>
                </div> */}
            </div>
        </div>
    );
};

export default Sidebar;