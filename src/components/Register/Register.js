import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';
import './Register.css';
import LeftBackgroundImg from '../../Assets/Images/register_left_side_img.png';

const Register = () => {
    const [registrationError, setRegistrationError] = useState('');

    const history = useHistory();
    const location = useLocation();


    const { from } = location.state || { from: { pathname: "/login" } };

    var auth = getAuth();

    const handleRegister = (e) => {
        e.preventDefault();

        const form = e.target;

        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
 
       
        if (! /(?=.*[A-Z])/.test(password)) {
            setRegistrationError('Please Provide at least One Uppercase letter');
            return;
        }

        if (! /(?=.*[!@#$&*])/.test(password)) {
            setRegistrationError('Please Provide at least One Special Character');
            return;
        }

        if (! /(?=.*[0-9])/.test(password)) {
            setRegistrationError('Password Must have at least One digit');
            return;
        }

        if (password.length < 6) {
            setRegistrationError('Password must have at least 6 character');
            return;
        }

        if(password !== confirmPassword) {
            setRegistrationError('Password and Confirmed Password Not Matched');
            return;
        }


        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // console.log(user);
                setRegistrationError('null');
                form.reset();
                emailVerification();
                updateUser(name);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log(errorMessage);
                setRegistrationError(errorMessage);
            });
    }

    const emailVerification = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                // Notification for successfully message send
                const Swal = require('sweetalert2')
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Email Verification Send Your Email Address, Please verify Your Email!!',
                    showConfirmButton: false,
                    timer: 2500,
                    timerProgressBar: true,
                })

            })

        history.replace(from);
    }

    const updateUser = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name,
            // photoURL: ""
        }).then(() => {
            // console.log("User Profile Update Successfully!");

        }).catch((error) => {
            // console.log(error);

        });
    }

    return (
        <div className="register_container">
            <Navbar></Navbar>
            <div className="container register_container_inner">
                <div className="row">

                    <div className="col-md-6 register_left_side align-self-center">
                        <img src={LeftBackgroundImg} alt="" className="LeftBackgroundImg img-fluid" />
                    </div>

                    <div className="col-md-6 register_right_side">
                        <div className=' pb-3'>
                            <h4 className='text-white'>Hello There,</h4>
                            <p className='text-white'>Register now to explore more</p>
                        </div>
                        <form className='register_form' onSubmit={handleRegister}>
                            <div className="pb-3">
                                {/* <label for="exampleInputName1" className="form-label">Name</label> */}
                                <input type="text" name="name" className="form-control form-control-lg" placeholder='Name' autoComplete="new-password" required />
                            </div>

                            <div className="pb-3">
                                <input type="email" name="email" className="form-control form-control-lg" placeholder='Email' aria-describedby="emailHelp" autoComplete="new-password" required />
                            </div>

                            <div className="pb-3">
                                <input type="password" name="password" className="form-control form-control-lg" placeholder='Password' autoComplete="new-password" required />
                                {/* <p className='text-secondary pt-2'>Password must contain at least 6 characters including at least one number, one capital letter, one special character</p> */}
                            </div>

                            <div className="pb-3">
                                <input type="password" name="confirmPassword" className="form-control form-control-lg" placeholder='Confirm Password' autoComplete="new-password" required />
                                <p className='text-secondary pt-2'>Password must contain at least 6 characters including at least one number, one capital letter, one special character</p>
                            </div>

                            <div className="">
                                {registrationError === 'null' ? <p className='text-success'></p> : <p className='text-danger'>{registrationError}</p>}
                            </div>

                            <div className='text-center pb-3 '>
                                <input type="submit" className="btn register_btn form-control-lg" value="Register" />
                            </div>

                        </form>
                        <div className='m-auto'>
                            <p className=''><small>Already have an account? <Link to="/login" className='ps-2'>Log in</Link></small></p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Register;