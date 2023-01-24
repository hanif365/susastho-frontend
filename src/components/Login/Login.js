import React, { useContext, useState } from 'react';
import './Login.css';

import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import firebaseConfig from './firebase.config';

import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, FacebookAuthProvider, GithubAuthProvider } from "firebase/auth";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Navbar from '../Shared/Navbar/Navbar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import Footer from '../Shared/Footer/Footer';

import LeftBackgroundImg from '../../Assets/Images/login_left_side_img.jpg';
import ReCAPTCHA from 'react-google-recaptcha';


const app = initializeApp(firebaseConfig);

const reCaptcha_Sitekey = process.env.REACT_APP_RECAPTCHA_SITEKEY;




const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [userEmail, setUserEmail] = useState();
    const [userPassword, setUserPassword] = useState();
    const [loginError, setLoginError] = useState('');
    const [errorCount, setErrorCount] = useState(0);
    // const [showReCaptcha, setShowReCaptcha] = useState(false);

    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };

    const auth = getAuth();

    const handleGoogleSignIn = () => {
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider)
            .then((res) => {
                const { displayName, email, photoURL, uid } = res.user;
                // console.log(res.user);
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL,
                    uid: uid
                }
                setLoggedInUser(signedInUser);
                history.replace(from);
            }).catch((err) => {
                const errorMessage = err.message;
                // console.log(errorMessage);
            });

    }

    const handleFacebookSignIn = () => {
        const facebookProvider = new FacebookAuthProvider();
        signInWithPopup(auth, facebookProvider)
            .then((res) => {
                const { displayName, email, photoURL, uid } = res.user;
                // console.log(res.user);
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL,
                    uid: uid
                }
                setLoggedInUser(signedInUser);
                history.replace(from);
            }).catch((err) => {
                const errorMessage = err.message;
                // console.log(errorMessage);
            });

    }

    // console.log("Logged In User Details: ", { loggedInUser });


    const handleGitHubSignIn = () => {
        const gitHubProvider = new GithubAuthProvider();
        signInWithPopup(auth, gitHubProvider)
            .then((res) => {
                const { displayName, email, photoURL, uid } = res.user;
                // console.log(res.user);
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL,
                    uid: uid
                }
                setLoggedInUser(signedInUser);
                history.replace(from);
            }).catch((err) => {
                const errorMessage = err.message;
                // console.log(errorMessage);
            });

    }

    const handleLogin = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, userEmail, userPassword)
            .then((res) => {
                const { displayName, email, photoURL, emailVerified, uid } = res.user;
                // console.log(emailVerified);
                // console.log(res.user);

                if (emailVerified) {
                    setLoginError('null');
                    const signedInUser = {
                        isSignedIn: true,
                        name: displayName,
                        email: email,
                        photo: photoURL,
                        uid: uid
                    }
                    setLoggedInUser(signedInUser);

                    history.replace(from);
                }
                else {
                    setLoginError('Please verify your Email First!');
                }

            })
            .catch((err) => {
                const errorCode = err.code;
                const errorMessage = err.message;
                // console.log(errorMessage);
                setLoginError(errorMessage);
                setErrorCount(errorCount + 1);

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
    }

    const handleReCaptcha = (value) => {
        console.log(value);

        if (value) {
            setErrorCount(1);
        }
    }

    console.log(reCaptcha_Sitekey);



    return (
        <div className="login-container">
            <Navbar></Navbar>

            <div className="container login-container_inner">
                <div className="row">
                    <div className="col-md-6 login_left_side align-self-center">
                        <img src={LeftBackgroundImg} alt="" className="LeftBackgroundImg img-fluid" />
                    </div>

                    <div className="col-md-6 login_right_side">
                        <div className=' pb-3'>
                            <h4 className='text-white'>Welcome Back !!</h4>
                        </div>

                        <form className='login_form  ' onSubmit={handleLogin}>
                            <div className="pb-3 ">
                                {/* <label for="exampleInputEmail1" className="form-label">Email address</label> */}
                                <input type="email" onBlur={(e) => setUserEmail(e.target.value)} className="form-control custom_form-control" placeholder='Email' aria-describedby="emailHelp" required />

                            </div>
                            <div className="pb-3 ">
                                {/* <label for="exampleInputPassword1" className="form-label">Password</label> */}
                                <input type="password" onBlur={(e) => setUserPassword(e.target.value)} className="form-control custom_form-control" placeholder='Password' required />
                            </div>

                            {errorCount > 2 && <div>
                                <ReCAPTCHA
                                    sitekey={reCaptcha_Sitekey}
                                    onChange={handleReCaptcha}
                                />
                            </div>}

                            <div className="form-check d-flex justify-content-between">
                                <div className='align-self-center'>
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" for="exampleCheck1">Remember Me</label>
                                </div>

                                <div className=''>
                                    <Link to="/forgot-password" className='btn btn-link'>Forgot Password</Link>
                                </div>
                            </div>

                            <div className=" pt-3">
                                {/* here we also show the success message in first p tag. Now we already using sweetalert2 notification instead it */}
                                {loginError === 'null' ? <p className='text-success'></p> : loginError === 'Please verify your Email First!' ? <>{loginError} <button onClick={emailVerification} className='btn btn-success'>Resend Verification Email</button></> : <p className='text-danger'>{loginError}</p>}
                            </div>

                            <div className='text-center py-3'>
                                {/* <button type="submit" className="btn btn-success">Submit</button> */}
                                <input type="submit" className={`${errorCount > 2 ? 'disabled' : ''} btn login_btn `} value="Log in" />
                            </div>

                        </form>
                        <div className='mx-2'>
                            <p className=''><small>Don't have an account? <Link to="/register" className='ps-2'>Register Now</Link></small></p>
                        </div>

                        <div className='d-flex'>
                            <div className='align-self-center pt-2 mx-2'>
                                <h5>Login with</h5>
                            </div>

                            <div className='align-self-center'>
                                <button onClick={handleGoogleSignIn} className="btn btn_sign_in"><FontAwesomeIcon icon={faGoogle} size='2x' data-bs-toggle="tooltip" data-bs-placement="top" title="Log In with Google" /></button>
                                <button onClick={handleFacebookSignIn} className="btn btn_sign_in"><FontAwesomeIcon icon={faFacebook} size='2x' data-bs-toggle="tooltip" data-bs-placement="top" title="Log In with Facebook" /></button>
                                <button onClick={handleGitHubSignIn} className="btn btn_sign_in"><FontAwesomeIcon icon={faGithub} size='2x' data-bs-toggle="tooltip" data-bs-placement="top" title="Log In with GitHub" /></button>
                            </div>


                        </div>
                    </div>


                </div>
            </div>


            {/* <Footer></Footer> */}
        </div>
    );
};

export default Login;