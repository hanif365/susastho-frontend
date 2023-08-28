import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import brandicon from "../../../Assets/Images/brandicon.png";
import { UserContext } from "../../../App";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignRight,
  faOilCan,
  faUserMd,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../contexts/UserContext";
import app from "../../../firebase/firebase.config";
import { getAuth } from "firebase/auth";

const Navbar = () => {
  // const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const {
    loggedInUser,
    setLoggedInUser,
    providerLogin,
    formRegistration,
    formLogin,
    logOut,
    isEmailVerified,
  } = useContext(AuthContext);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  // Change Navbar background color conditionally
  const [navBg, setNavBg] = useState("#36A9F0");

  const location = useLocation();
  // console.log("Location is : ", location);

  const auth = getAuth(app);

  console.log(auth.currentUser);

  // loggedInUser === currentUser (details in _task.txt)

  const currentUser = auth.currentUser;

  //   we need to change loggedInUser to currentUser

  useEffect(() => {
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/home" ||
      window.location.pathname === "/covid-19"
    ) {
      setNavBg("transparent");
    } else {
      setNavBg("#36A9F0");
      // setNavBg('#07f5f575');
    }
  }, []);

  // Check admin or not
  const handleFetchCheckAdmin = async () => {
    const BackendLink = process.env.REACT_APP_BACKENDLINK;

    try {
      const response = await fetch(`${BackendLink}/isAdmin`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: currentUser.email }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data from the server");
      }

      const data = await response.json();
      console.log("IsAdmin: ***************: ", data);
      setIsAdmin(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Check super admin or not
  const handleFetchCheckSuperAdmin = async () => {
    try {
      const BackendLink = process.env.REACT_APP_BACKENDLINK;
      const response = await fetch(`${BackendLink}/isSuperAdmin`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: currentUser.email }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch super admin data");
      }

      const data = await response.json();
      console.log("IsSuperAdmin: ***************: ", data);
      setIsSuperAdmin(data);
    } catch (error) {
      console.error("Error fetching super admin data:", error);
    }
  };

  useEffect(() => {
    if (currentUser?.email) {
      handleFetchCheckAdmin();
      handleFetchCheckSuperAdmin();
    }
  }, [currentUser?.email]);

  const showNotification = () => {
    const Swal = require("sweetalert2");
    Swal.fire({
      position: "center",
      icon: "error",
      title: "You are Logged Out!.",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
    });
  };

  const showNotificationForIdentification = () => {
    // console.log(currentUser);
    const Swal = require("sweetalert2");
    Swal.fire({
      position: "top",
      // icon: 'success',
      title: isSuperAdmin
        ? "Logged In as Super Admin"
        : isAdmin
        ? "Logged In as Admin"
        : "Logged In as User",
      html:
        "Name : " +
        currentUser.displayName +
        "<br />" +
        "Email : " +
        currentUser.email,
      // text: isSuperAdmin ? 'You are Super Admin' : isAdmin ? 'You are Admin' : 'You are User',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      width: "500px",
      background: "#FEE3EC",
      color: "#FF1700",
    });
  };

  const changeBackgroundNavbar = () => {
    if (window.scrollY >= 600) {
      setShowNavbar(true);
    } else {
      setShowNavbar(false);
    }
    // console.log(showNavbar);
    // console.log(window.scrollY);
  };

  window.addEventListener("scroll", changeBackgroundNavbar);

  // handle log out
  const handleLogOut = async () => {
    try {
      await logOut();
      console.log("Sign Out Successfully!");
      showNotification();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(currentUser && currentUser);

  return (
    <div>
      {/* <nav className="navbar navbar-expand-lg fixed-top navbar-dark" className={showNavbar ? 'navbar showNavbar navbar-expand-lg fixed-top navbar-light' : 'navbar navbar-expand-lg fixed-top navbar-light'} style={{ backgroundColor: navBg }}> */}
      <nav
        className={
          showNavbar
            ? "navbar showNavbar navbar-expand-lg fixed-top navbar-light"
            : "navbar navbar-expand-lg fixed-top navbar-light"
        }
        style={{ backgroundColor: navBg }}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            {" "}
            <img src={brandicon} alt="" className="brandicon" />{" "}
            <span className="first-letter">S</span>USASTHO
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              <Link className="nav-link active" aria-current="page" to="/home">
                HOME
              </Link>

              <Link to="/dashboard" className="nav-link">
                DASHBOARD
              </Link>

              <Link className="nav-link" to="/doctors">
                DOCTORS
              </Link>

              {/* <Link className="nav-link txt-danger" to="covid-19">COVID-19</Link> */}

              {currentUser?.uid && isEmailVerified ? (
                currentUser?.photoURL ? (
                  <Link
                    onClick={() => showNotificationForIdentification()}
                    className="nav-link photo-link"
                  >
                    <img
                      className="user-img"
                      src={currentUser?.photoURL}
                      id={isSuperAdmin ? "super-admin" : isAdmin ? "admin" : ""}
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link
                    onClick={() => showNotificationForIdentification()}
                    className="nav-link"
                    id="user-name"
                  >
                    {currentUser?.displayName}
                  </Link>
                )
              ) : (
                <Link to="/login" className="nav-link btn btn-login px-2">
                  LOG IN
                </Link>
              )}

              {currentUser?.uid && isEmailVerified ? (
                <Link
                  className="sign-out-btn btn-lg"
                  onClick={() => {
                    // showNotification();
                    handleLogOut();
                  }}
                >
                  LOG OUT
                </Link>
              ) : (
                ""
              )}

              {currentUser?.uid && isEmailVerified ? (
                ""
              ) : (
                <Link className="nav-link btn btn_register" to="/register">
                  REGISTER
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
