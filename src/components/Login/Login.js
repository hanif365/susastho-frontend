import React, { useContext, useState } from 'react';
import './Login.css'
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// import firebase from "firebase/app";
// import "firebase/auth";
import firebaseConfig from './firebase.config';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

import { UserContext } from '../../App'
import { useHistory, useLocation } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';


const app = initializeApp(firebaseConfig);

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// } else {
//     firebase.app(); // if already initialized
// }


// Sign in using email and password 
const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();

    // if only password and confirmed password matched then an user account created

    const [password, setPassword] = useState({
        passName: '',
        errorMesg: ''
    });
    const [conPassword, setConPassword] = useState({
        passName: '',
        errorMesg: ''
    });

    const { from } = location.state || { from: { pathname: "/" } };
    const [newUser, SetNewUser] = useState(false);

    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    });

    const handleBlur = (e) => {
        let isFieldValid = true;

        if (e.target.name === 'email') {                            // Check email field validation using regular expression
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password' || e.target.name === 'confirmedPassword') {
            console.log(e.target.name, e.target.value);
            const isPasswordValid = e.target.value.length > 6;      // Check password field validation, password length must be
            const passwordHasNumber = /\d{1}/.test(e.target.value); // greater than 6 and have at least one number.
            isFieldValid = isPasswordValid && passwordHasNumber;
            if (isFieldValid === false) {                           // if password pattern wrong show an message using alert popup
                alert('Wrong password pattern given. Please follow below instruction.');
            }
            console.log(e.target.value.length);
            let firstPassword = e.target.value.length;
        }
        if (e.target.name === 'password') {
            const newPassword = { ...password };
            newPassword.passName = e.target.value;
            setPassword(newPassword);
        }
        if (e.target.name === 'confirmedPassword') {
            const newConPassword = { ...conPassword };
            newConPassword.passName = e.target.value;
            setConPassword(newConPassword);
        }
        if (password.passName !== conPassword.passName) {   // if password and confirmed password not match then show an error
            const newErrorMesg = { ...password };             // message.
            newErrorMesg.errorMesg = "Password and Confirmed Password not Matched! Please give same password both field";
            setPassword(newErrorMesg);
        }


        if (isFieldValid) {                         // if email and password both right format then update it  using setUser
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);

        }

    }

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {       // if a user is newuser and email and password is true then submit 
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)   // the info and update also
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = "";
                    newUserInfo.success = true;
                    setUser(newUserInfo);

                    updateUserName(user.name);
                })
                .catch((err) => {                       // if an error occur then set error message
                    const newUserInfo = { ...user };
                    newUserInfo.error = err.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }

        if (!newUser && user.email && user.password) {                              // if user is not newuser and both email and
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)   // password valid then sign in
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = "";
                    newUserInfo.success = true;
                    setUser(newUserInfo);

                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch((err) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = err.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }

        e.preventDefault();

    }

    const updateUserName = (name) => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
        }).then(function () {
        }).catch(function (error) {
        });
    }

    // Google Authentication

    const handleGoogleSignIn = () => {
        const googleProvider = new GoogleAuthProvider();
        const auth = getAuth();
            signInWithPopup(auth, googleProvider)
            .then(res => {
                const { displayName, email, photoURL } = res.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setLoggedInUser(signedInUser);
                history.replace(from);
            }).catch(err => {
                const errorCode = err.code;
                const errorMessage = err.message;
                const showError = {
                    error: err.message
                }
                setUser(showError);
            });
    }

    // Facebook Authentication

    const handleFacebookSignIn = () => {
        const fbProvider = new FacebookAuthProvider();
        const auth = getAuth();
            signInWithPopup(auth, fbProvider)
            .then(res => {
                const { displayName, email, photoURL } = res.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setLoggedInUser(signedInUser);
                history.replace(from);
            })
            .catch(err => {
                const errorCode = err.code;
                const errorMessage = err.message;
                const email = err.email;
                console.log(err.message);
                const showError = {
                    error: err.message
                }
                setUser(showError);
            });
    }

    // GitHub Authentication

    const handleGithubSignIn = () => {
        const githubProvider = new firebase.auth.GithubAuthProvider();
        firebase
            .auth()
            .signInWithPopup(githubProvider)
            .then(res => {
                const user = res.user;
                const { displayName, email, photoURL } = res.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setLoggedInUser(signedInUser);
                history.replace(from);
            }).catch(err => {
                var errorMessage = err.message;
                var email = err.email;
                console.log(err.message);
                const showError = {
                    error: err.message
                }
                setUser(showError);
            });
    }

    return (
        <div className="main-container container-fluid">
            <Navbar></Navbar>
            <div className="row">
                <div className="col">
                    <div className="form-container">
                        <div className="form-content mt-5">
                            <form onSubmit={handleSubmit} className="">
                                <div >
                                    {newUser && password.passName !== conPassword.passName && <p className="text-warning">{password.errorMesg}</p>}
                                    <p className="text-warning">{user.error}</p>
                                    {
                                        user.success && <h4 className="text-success">User Created Successfully</h4>

                                    }
                                </div>
                                <h2>{newUser ? 'Create an Account' : 'Login'}</h2>
                                {newUser && <div class="mb-3">
                                    <input onBlur={handleBlur} type="text" class="form-control form-control-lg" id="exampleInputEmail1" name="name" placeholder="Name" required />
                                </div>}
                                <div class="mb-3">
                                    <input onBlur={handleBlur} type="email" class="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" placeholder="Email" required />
                                </div>

                                <div class="mb-3">
                                    <input onBlur={handleBlur} type="password" class="form-control form-control-lg" id="exampleInputPassword1" name="password" placeholder="Password" required />
                                    <p>Please give at list 7 digit including a number</p>
                                </div>
                                {newUser && <div class="mb-3">
                                    <input onBlur={handleBlur} type="password" class="form-control form-control-lg" id="exampleInputPassword1" name="confirmedPassword" placeholder="Confirmed Password" required />
                                    <p>Please give at list 7 digit including a number</p>
                                </div>}

                                {!newUser && <div class="mb-3 form-check">
                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                    <label class="form-check-label" for="exampleCheck1">Remainder me</label>
                                    <Link className="forgot-password" to="/login" onClick={() => SetNewUser(!newUser)}>Forgot password?</Link>
                                </div>}
                                <input onClick={handleBlur} type="submit" class="btn btn-success w-100" value={newUser ? "CREATE AN ACCOUNT" : "LOGIN"} />
                                <h5>{newUser ? "Already have an account?" : "Don't have an account?"}<span>{newUser ? <span className="login-btn" onClick={() => SetNewUser(!newUser)}> Login now</span> : <span className="create-btn" onClick={() => SetNewUser(!newUser)}> Create an account</span>}</span></h5>
                            </form>
                        </div>
                    </div>
                    <div className="text-center divider pt-5">
                        <h2>OR LOG IN WITH</h2>
                        <hr />
                    </div>
                    <div className="google-container text-center pt-5">
                        <button className="btn btn-info btn-lg login-others" onClick={handleGoogleSignIn}><FontAwesomeIcon className="logo" icon={faGoogle} /> Continue With Google</button>
                        {
                            user.isSignedIn && <p>Welcome, {user.name}</p>
                        }
                    </div>
                    <div className="facebook-container text-center pt-3">
                        <button className="btn btn-info btn-lg login-others" onClick={handleFacebookSignIn}><FontAwesomeIcon className="logo" icon={faFacebook} /> Continue With Facebook</button>
                        {
                            user.isSignedIn && <p>Welcome, {user.name}</p>
                        }
                    </div>
                    <div className="github-container text-center py-3">
                        <button className="btn btn-info btn-lg login-others" onClick={handleGithubSignIn}><FontAwesomeIcon className="logo" icon={faGithub} /> Continue With GitHub</button>
                        {
                            user.isSignedIn && <p>Welcome, {user.name}</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;