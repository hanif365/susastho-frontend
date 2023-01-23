import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const [userEmail, setUserEmail] = useState();

    const history = useHistory();
    const location = useLocation();


    const { from } = location.state || { from: { pathname: "/login" } };

    var auth = getAuth();


    const handleForgotPassword = (e) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, userEmail)
            .then(() => {
                const Swal = require('sweetalert2')
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Password Reset Email Sent! Please Check Your Email!!',
                    showConfirmButton: false,
                    timer: 2500,
                    timerProgressBar: true,
                })

                history.replace(from);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log(errorMessage);
            });

    }


    return (
        <div className='ForgotPassword_container'>
            <Navbar></Navbar>
            <div className="container">
                <div className="row">
                    <div className=" ForgotPassword_container_inner">
                        {userEmail}
                        <form className='ForgotPassword_form  ' onSubmit={handleForgotPassword}>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Enter your Email to reset Password</label>

                                <input type="email" onBlur={(e) => setUserEmail(e.target.value)} className="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp" required />

                            </div>
                            <div className='text-center py-5 '>
                                {/* <button type="submit" className="btn btn-success">Submit</button> */}
                                <input type="submit" className="btn reset_password_btn form-control-lg" value="Reset Password" />
                            </div>
                        </form>
                        <div className=''>
                            <p className=''><small>Remember your password? <Link to="/login" className='ps-2'>Try Logging in</Link></small></p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default ForgotPassword;