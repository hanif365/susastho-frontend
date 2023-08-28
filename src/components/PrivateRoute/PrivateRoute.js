import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../../App";
import { AuthContext } from "../../contexts/UserContext";
import { getAuth } from "firebase/auth";
import app from "../../firebase/firebase.config";

const PrivateRoute = ({ children, ...rest }) => {
  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  console.log("Logged In user test: -*****************: ", currentUser);

//   const { loggedInUser, providerLogin, logOut } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
      currentUser?.uid ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
