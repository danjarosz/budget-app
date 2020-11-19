import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../components/layout/Header/Header";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = useSelector(({ auth }) => auth.uid);
    return <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <div><Header /><Component {...props} /></div>
        ) : (<Redirect to="/" />)
    )} />
}

export default PrivateRoute;