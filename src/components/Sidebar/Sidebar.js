import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAmbulance,
  faCalendarCheck,
  faCheckDouble,
  faCommentAlt,
  faHandHoldingWater,
  faSignOutAlt,
  faUserMd,
  faUserPlus,
  faUsersCog,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import Navbar from "../Shared/Navbar/Navbar";
import { AuthContext } from "../../contexts/UserContext";
import { getAuth } from "firebase/auth";
import app from "../../firebase/firebase.config";

const Sidebar = ({ loading, isAdmin, isSuperAdmin, isDoctor }) => {
  const { loggedInUser, providerLogin, logOut } = useContext(AuthContext);

  console.log("isAdmin", isAdmin);
  console.log("isSuperAdmin", isSuperAdmin);
  console.log("isDoctor", isDoctor);

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

  // handle log out
  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("Sign Out SuccessFully!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sidebar-container">
      <Navbar></Navbar>
      <div className="sidebar d-flex flex-column justify-content-between col-sm-5 col-md-3 col-5">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="list-unstyled">
            {(isAdmin || isSuperAdmin) && (
              <div>
                {isSuperAdmin && (
                  <div className="super-admin-panel">
                    <h4 className="super-admin-panel-inner">
                      <FontAwesomeIcon icon={faUserShield} />{" "}
                      <span>Super Admin Panel</span>
                    </h4>

                    <li>
                      <Link to="/makesuperadmin" className="text-white">
                        <FontAwesomeIcon icon={faUserShield} />{" "}
                        <span>Make Super Admin</span>
                      </Link>
                    </li>

                    <li>
                      <Link to="/makeadmin" className="text-white">
                        <FontAwesomeIcon icon={faUserPlus} />{" "}
                        <span>Make Admin</span>
                      </Link>
                    </li>

                    <li>
                      <Link to="/confirmeddoctor" className="text-white">
                        <FontAwesomeIcon icon={faCheckDouble} />{" "}
                        <span>Confirmed Doctor</span>
                      </Link>
                    </li>

                    <li>
                      <Link to="/allAppointment" className="text-white">
                        <FontAwesomeIcon icon={faCalendarCheck} />{" "}
                        <span>All Appointment</span>
                      </Link>
                    </li>
                  </div>
                )}

                <div className="admin-panel">
                  <h4 className="admin-panel-inner">
                    <FontAwesomeIcon icon={faUsersCog} />{" "}
                    <span>Admin Panel</span>
                  </h4>
                  <li>
                    <Link to="/adddoctor" className="text-white">
                      <FontAwesomeIcon icon={faUserMd} />{" "}
                      <span>Add Doctor</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="/addemergencyinfo" className="text-white">
                      <FontAwesomeIcon icon={faAmbulance} />{" "}
                      <span>Add Emergency Info</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="/addbloodbankinfo" className="text-white">
                      <FontAwesomeIcon icon={faHandHoldingWater} />{" "}
                      <span>Add Blood Bank Info</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="/addhealthtips" className="text-white">
                      <FontAwesomeIcon icon={faCalendarCheck} />{" "}
                      <span>Add Health Tips</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="/addtestimonials" className="text-white">
                      <FontAwesomeIcon icon={faCalendarCheck} />{" "}
                      <span>Add Testimonials</span>
                    </Link>
                  </li>
                </div>
              </div>
            )}

            {isDoctor && (
              <div className="super-admin-panel">
                <h4 className="super-admin-panel-inner">
                  <FontAwesomeIcon icon={faUserMd} /> <span>Doctor Panel</span>
                </h4>
                <li>
                  <Link to="/appointmentpatients" className="text-white">
                    <FontAwesomeIcon icon={faCalendarCheck} />{" "}
                    <span>Appointment Patients</span>
                  </Link>
                </li>
              </div>
            )}

            {!isDoctor && (
              <li>
                <Link to="/appointment" className="text-white">
                  <FontAwesomeIcon icon={faCalendarCheck} />{" "}
                  <span>Appointment</span>
                </Link>
              </li>
            )}

            {/* <li>
                        <Link to="/addreview" className="text-white">
                            <FontAwesomeIcon icon={faCommentAlt} /> <span>Add Review</span>
                        </Link>
                    </li> */}

            <li>
              <Link
                to="/"
                onClick={() => {
                  showNotification();
                  handleLogOut();
                }}
                className="logout text-danger fw-bold"
              >
                <FontAwesomeIcon icon={faSignOutAlt} /> <span>LOG OUT</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
