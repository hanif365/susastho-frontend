import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'
import brandicon from '../../../Assets/Images/brandicon.png'
import { UserContext } from '../../../App';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignRight, faOilCan, faUserMd } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [isAdmin, setIsAdmin] = useState(false);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const [showNavbar, setShowNavbar] = useState(false);

    // Change Navbar background color conditionally
    const [navBg, setNavBg] = useState("#36A9F0");

    const location = useLocation();
    // console.log("Location is : ", location);

    useEffect(() => {
        if ((window.location.pathname === "/") || (window.location.pathname === "/home") || (window.location.pathname === "/covid-19")) {
            setNavBg("transparent");
        } else {
            setNavBg('#36A9F0');
            // setNavBg('#07f5f575');
        }
    }, [])


    // Check admin or not
    const handleFetchCheckAdmin = async () => {
        console.log(loggedInUser);

        const BackendLink = process.env.REACT_APP_BACKENDLINK;
        const response = await fetch(`${BackendLink}/isAdmin`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: loggedInUser.email })
        });
        const data = await response.json();
        console.log("Admin Status:  ***************", data);
        setIsAdmin(data);
    }

    useEffect(() => {
        if (loggedInUser.email) {
            handleFetchCheckAdmin();
        }
    }, [])

    // 

    // useEffect(() => {
    //     const BackendLink = process.env.REACT_APP_BACKENDLINK;
    //     fetch(`${BackendLink}/isAdmin`, {
    //         method: 'POST',
    //         headers: { 'content-type': 'application/json' },
    //         body: JSON.stringify({ email: loggedInUser.email })
    //     })
    //         .then(res => res.json())
    //         .then(data => setIsAdmin(data));
    // }, [])


    // Check admin super-admin or not
    const handleFetchCheckSuperAdmin = async () => {
        const BackendLink = process.env.REACT_APP_BACKENDLINK;
        const response = await fetch(`${BackendLink}/isSuperAdmin`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: loggedInUser.email })
        });
        const data = await response.json();
        console.log("Super Admin Status:  ***************", data);
        setIsSuperAdmin(data);
    }

    useEffect(() => {
        console.log(loggedInUser);

        if (loggedInUser.email) {
            handleFetchCheckSuperAdmin();
        }
    }, [])


    // useEffect(() => {
    //     const BackendLink = process.env.REACT_APP_BACKENDLINK;
    //     fetch(`${BackendLink}/isSuperAdmin`, {
    //         method: 'POST',
    //         headers: { 'content-type': 'application/json' },
    //         body: JSON.stringify({ email: loggedInUser.email })
    //     })
    //         .then(res => res.json())
    //         .then(data => setIsSuperAdmin(data));
    // }, [])

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

    const showNotificationForIdentification = () => {
        // console.log(loggedInUser);
        const Swal = require('sweetalert2')
        Swal.fire({
            position: 'top',
            // icon: 'success',
            title: isSuperAdmin ? 'Logged In as Super Admin' : isAdmin ? 'Logged In as Admin' : 'Logged In as User',
            html: 'Name : ' + loggedInUser.name + '<br />' + 'Email : ' + loggedInUser.email,
            // text: isSuperAdmin ? 'You are Super Admin' : isAdmin ? 'You are Admin' : 'You are User',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            width: '500px',
            background: '#FEE3EC',
            color: '#FF1700',
        })
    }

    const changeBackgroundNavbar = () => {

        if (window.scrollY >= 600) {
            setShowNavbar(true);
        } else {
            setShowNavbar(false);
        }
        // console.log(showNavbar);
        // console.log(window.scrollY);
    }

    window.addEventListener("scroll", changeBackgroundNavbar);

    return (
        <div>
            {/* <nav className="navbar navbar-expand-lg fixed-top navbar-dark" className={showNavbar ? 'navbar showNavbar navbar-expand-lg fixed-top navbar-light' : 'navbar navbar-expand-lg fixed-top navbar-light'} style={{ backgroundColor: navBg }}> */}
            <nav className={showNavbar ? 'navbar showNavbar navbar-expand-lg fixed-top navbar-light' : 'navbar navbar-expand-lg fixed-top navbar-light'} style={{ backgroundColor: navBg }}>
                <div className="container">
                    <Link className="navbar-brand" to="/"> <img src={brandicon} alt="" className="brandicon" /> <span className="first-letter">S</span>USASTHO</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto">
                            <Link className="nav-link active" aria-current="page" to="/home">HOME</Link>

                            <Link to="/dashboard" className="nav-link">DASHBOARD</Link>

                            <Link className="nav-link" to="/doctors">DOCTORS</Link>

                            {/* <Link className="nav-link txt-danger" to="covid-19">COVID-19</Link> */}

                            {
                                loggedInUser.email ? loggedInUser.photo ? <Link onClick={() => showNotificationForIdentification()} className="nav-link photo-link"><img className='user-img' src={loggedInUser.photo} id={isSuperAdmin ? "super-admin" : isAdmin ? "admin" : ""} alt="" /></Link> : <Link className="nav-link" id="user-name">{loggedInUser.name}</Link> : <Link to="/login" className="nav-link btn btn-login px-2">LOG IN</Link>

                            }

                            {
                                loggedInUser.email ? <Link className="sign-out-btn btn-lg" onClick={() => { showNotification(); setLoggedInUser({}) }}>LOG OUT</Link> : ''
                            }

                            {/* {loggedInUser && <div className='identification-show'>
                                {
                                    isSuperAdmin ? <p>You are Super Admin</p> : isAdmin ? <p>You are Admin</p> : <p>You are user</p>
                                }
                            </div>
                            } */}

                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;