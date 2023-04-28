import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface PrivateRouteProps extends RouteProps {
    component: any;
    allowedUsers: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, allowedUsers: AllowedUsers, ...rest}) => {
    const isAuthenticated = () => {
        const token = localStorage.getItem("jwtToken");
        return token !== null;
    };

    const isAllowedUser = () => {
        const userType = localStorage.getItem('userType')
        return userType !== null && AllowedUsers.includes(userType)
    };
 
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated() ? (
                    isAllowedUser() ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to={{ pathname: "/clients", state: { from: props.location } }} />
                    )
                ) : (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                )
            }
        />
    );
};

export default PrivateRoute;