import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AddDoctor from "./components/AdminPanel/AddDoctor/AddDoctor";
import AddEmergencyInfo from "./components/AdminPanel/AddEmergencyInfo/AddEmergencyInfo";
import MakeAdmin from "./components/AdminPanel/MakeAdmin/MakeAdmin";
import Dashboard from "./components/Dashboard/Dashboard/Dashboard";

import Home from './components/Home/Home/Home';
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AddAppointment from "./components/ServicesDetails/AddAppointment/AddAppointment";
import Appointment from "./components/ServicesDetails/Appointment/Appointment";
import Doctors from "./components/ServicesDetails/Doctors/Doctors";
import Emergency from "./components/ServicesDetails/Emergency/Emergency";
import Footer from "./components/Shared/Footer/Footer";
import Navbar from "./components/Shared/Navbar/Navbar";

export const UserContext = createContext();
export const DoctorContext = createContext();


function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [selectedDoctor, setSelectedDoctor] = useState({});


  return (
    <DoctorContext.Provider value={[selectedDoctor, setSelectedDoctor]}>
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
          {/* Doctor Name : {selectedDoctor.name} */}
          {/* <Navbar></Navbar> */}
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>
            {/* <Route path="/admin">
            <Admin></Admin>
          </Route> */}

            {/* <Route path="/dashboard">
              <Dashboard></Dashboard>
            </Route> */}
            <PrivateRoute path="/dashboard">
              <Dashboard></Dashboard>
            </PrivateRoute>

            <Route path="/appointment">
              <Appointment></Appointment>
            </Route>

            <Route path="/adddoctor">
              <AddDoctor></AddDoctor>
            </Route>

            <Route path="/makeadmin">
              <MakeAdmin></MakeAdmin>
            </Route>
            {/* <PrivateRoute path="/manageservices">
            <ManageService></ManageService>
          </PrivateRoute> */}

            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/doctors">
              <Doctors></Doctors>
            </Route>

            <Route path="/emergency">
              <Emergency></Emergency>
            </Route>

            <PrivateRoute path="/addappointment">
              <AddAppointment></AddAppointment>
            </PrivateRoute>

            <Route path="/addemergencyinfo">
              <AddEmergencyInfo></AddEmergencyInfo>
            </Route>

            {/* <PrivateRoute path="/doctors">
            <Doctors></Doctors>
          </PrivateRoute> */}

            {/* <PrivateRoute path="/service/:serviceId">
            <Order></Order>
          </PrivateRoute> */}
            {/* <PrivateRoute path="/service/:serviceId">
            <Orders></Orders>
          </PrivateRoute> */}
            {/* <Route path="/order">
            <Order></Order>
          </Route> */}
            {/* <PrivateRoute path="/orders">
            <Orders></Orders>
          </PrivateRoute>
          <Route path="/bookinglists">
            <BookingLists></BookingLists>
          </Route>
          <Route path="/addreview">
            <Review></Review>
          </Route> */}
          </Switch>
          {/* <Footer></Footer> */}
        </Router>
      </UserContext.Provider >
    </DoctorContext.Provider>
  );
}




export default App;


