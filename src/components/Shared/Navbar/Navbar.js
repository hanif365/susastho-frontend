import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import brandicon from '../../../Assets/Images/brandicon.png'
import { UserContext } from '../../../App';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignRight, faOilCan, faUserMd } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);

    useEffect(() => {
        fetch('https://sleepy-fjord-79948.herokuapp.com/isAdmin', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => setIsAdmin(data));
    }, [])

    // Check admin super-admin or not
    useEffect(() => {
        fetch('https://sleepy-fjord-79948.herokuapp.com/isSuperAdmin', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => setIsSuperAdmin(data));
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

    const showNotificationForIdentification = () => {
        console.log(loggedInUser)
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
    return (
        <div>
            <nav class="navbar navbar-expand-lg fixed-top navbar-dark">
                <div class="container">
                    <Link class="navbar-brand" to="/"> <img src={brandicon} alt="" className="brandicon" /> <span className="first-letter">S</span>USASTHO</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav ms-auto">
                            <Link class="nav-link active" aria-current="page" to="/home">HOME</Link>

                            <Link to="/dashboard" class="nav-link">DASHBOARD</Link>

                            <Link class="nav-link" to="/doctors">DOCTORS</Link>

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