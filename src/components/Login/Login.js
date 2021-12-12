import React, { useContext } from 'react';
import './Login.css';

import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import firebaseConfig from './firebase.config';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Navbar from '../Shared/Navbar/Navbar';


const app = initializeApp(firebaseConfig);


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();


    const { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((res) => {
                const {displayName, email, photoURL} = res.user;
                console.log(displayName, email, photoURL);
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setLoggedInUser(signedInUser);
                history.replace(from);
            }).catch((err) => {
                const errorMessage = err.message;
                console.log(errorMessage);
            });

    }
    return (
        <div className=" py-5 text-center login-container">
            <Navbar></Navbar>
            <button onClick={handleGoogleSignIn} className="btn btn-info px-5">Sign In with Google</button>

        </div>
    );
};

export default Login;