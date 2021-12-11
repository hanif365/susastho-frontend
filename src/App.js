import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './components/Home/Home/Home';
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Doctors from "./components/ServicesDetails/Doctors/Doctors";
import Footer from "./components/Shared/Footer/Footer";
import Navbar from "./components/Shared/Navbar/Navbar";

export const UserContext = createContext()


function App() {
  const [loggedInUser, setLoggedInUser] = useState({});


  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>
          {/* <Route path="/admin">
            <Admin></Admin>
          </Route>
          <PrivateRoute path="/dashboard">
            <Dashboard></Dashboard>
          </PrivateRoute>
          <Route path="/orderlist">
            <OrderList></OrderList>
          </Route>
          <Route path="/addservice">
            <AddService></AddService>
          </Route>
          <Route path="/makeadmin">
            <MakeAdmin></MakeAdmin>
          </Route>
          <PrivateRoute path="/manageservices">
            <ManageService></ManageService>
          </PrivateRoute> */}
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/doctors">
            <Doctors></Doctors>
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
        <Footer></Footer>
      </Router>
    </UserContext.Provider >
  );
}




export default App;


