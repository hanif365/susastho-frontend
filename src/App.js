import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AddBloodBankInfo from "./components/AdminPanel/AddBloodBankInfo/AddBloodBankInfo";
import AddDoctor from "./components/AdminPanel/AddDoctor/AddDoctor";
import AddEmergencyInfo from "./components/AdminPanel/AddEmergencyInfo/AddEmergencyInfo";
import AddHealthTips from "./components/AdminPanel/AddHealthTips/AddHealthTips";
import MakeAdmin from "./components/AdminPanel/MakeAdmin/MakeAdmin";
import Dashboard from "./components/Dashboard/Dashboard/Dashboard";

import Home from './components/Home/Home/Home';
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AddAppointment from "./components/ServicesDetails/AddAppointment/AddAppointment";
import Appointment from "./components/ServicesDetails/Appointment/Appointment";
import BloodBank from "./components/ServicesDetails/BloodBank/BloodBank";
import Doctors from "./components/ServicesDetails/Doctors/Doctors";
import Emergency from "./components/ServicesDetails/Emergency/Emergency";
import HealthTips from "./components/ServicesDetails/HealthTips/HealthTips";
import Footer from "./components/Shared/Footer/Footer";
import Navbar from "./components/Shared/Navbar/Navbar";
import ConfirmedDoctor from "./components/SuperAdminPanel/ConfirmedDoctor/ConfirmedDoctor";
import MakeSuperAdmin from "./components/SuperAdminPanel/MakeSuperAdmin/MakeSuperAdmin";

export const UserContext = createContext();
export const DoctorContext = createContext();


function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [selectedDoctor, setSelectedDoctor] = useState({});


  return (
    <DoctorContext.Provider value={[selectedDoctor, setSelectedDoctor]}>
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
          {/* <Navbar></Navbar> */}
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>

            <Route path="/login">
              <Login></Login>
            </Route>

            {/* Must be Private Dashborad */}
            <Route path="/dashboard">
              <Dashboard></Dashboard>
            </Route>


            <PrivateRoute path="/adddoctor">
              <AddDoctor></AddDoctor>
            </PrivateRoute>

            <PrivateRoute path="/makeadmin">
              <MakeAdmin></MakeAdmin>
            </PrivateRoute>

            <Route path="/makesuperadmin">
              <MakeSuperAdmin></MakeSuperAdmin>
            </Route>

            <Route path="/confirmeddoctor">
              <ConfirmedDoctor></ConfirmedDoctor>
            </Route>


            <PrivateRoute path="/addemergencyinfo">
              <AddEmergencyInfo></AddEmergencyInfo>
            </PrivateRoute>

            <PrivateRoute path="/addbloodbankinfo">
              <AddBloodBankInfo></AddBloodBankInfo>
            </PrivateRoute>

            <PrivateRoute path="/addhealthtips">
              <AddHealthTips></AddHealthTips>
            </PrivateRoute>

            <Route path="/appointment">
              <Appointment></Appointment>
            </Route>

            <Route path="/doctors">
              <Doctors></Doctors>
            </Route>

            <PrivateRoute path="/addappointment">
              <AddAppointment></AddAppointment>
            </PrivateRoute>

            <Route path="/emergency">
              <Emergency></Emergency>
            </Route>

            <Route path="/bloodbank">
              <BloodBank></BloodBank>
            </Route>

            <Route path="/healthtips">
              <HealthTips></HealthTips>
            </Route>

          </Switch>
          {/* <Footer></Footer> */}
        </Router>
      </UserContext.Provider >
    </DoctorContext.Provider>
  );
}




export default App;


