import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../../App';
import { AuthContext } from '../../contexts/UserContext';

const PrivateRoute = ({ children, ...rest }) => {
    // const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const { loggedInUser, providerLogin, logOut } = useContext(AuthContext);
    console.log("Logged In user test: -*****************: ", loggedInUser)
    return (
        <Route
            {...rest}
            render={({ location }) =>
                (loggedInUser?.uid) ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;