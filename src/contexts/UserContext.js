import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();

const auth = getAuth(app);

const UserContext = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  const providerLogin = (provider) => {
    return signInWithPopup(auth, provider);
  };

  const formRegistration = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const formLogin = (userEmail, userPassword) => {
    return signInWithEmailAndPassword(auth, userEmail, userPassword);
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      console.log("Inner logout");
      setLoggedOut(true); // Set the loggedOut state to true after successful sign out
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      console.log(currentUser?.providerData[0].providerId);
      console.log(currentUser?.email);
      console.log(currentUser?.emailVerified);

      if (
        currentUser?.providerData[0].providerId === "facebook.com" ||
        currentUser?.providerData[0].providerId === "github.com" ||
        currentUser?.providerData[0].providerId === "google.com"
      ) {
        console.log("Login with", currentUser?.providerData[0].providerId);
        setLoggedInUser(currentUser);
        setIsEmailVerified(true);
      } else if (currentUser?.emailVerified) {
        setLoggedInUser(currentUser);
        setIsEmailVerified(true);
      } else if (currentUser === "null") {
        setLoggedInUser(currentUser);
      }

      if (loggedOut) {
        // Reset states when logged out
        setLoggedInUser(null);
        setIsEmailVerified(false);
        setLoggedOut(false);
      }

      // setLoggedInUser(currentUser);
    });

    return () => unSubscribe();
  }, [loggedOut]);

  const authInfo = {
    loggedInUser,
    setLoggedInUser,
    providerLogin,
    formRegistration,
    formLogin,
    logOut,
    isEmailVerified,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default UserContext;
