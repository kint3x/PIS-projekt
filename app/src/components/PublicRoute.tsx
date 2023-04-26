import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface PublicRouteProps extends RouteProps {
    component: any;
    method?: (userName: string, userType: string) => void;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ component: Component, method, ...rest }) => {
    const isAuthenticated = () => {
        const token = localStorage.getItem("jwtToken");
        return token !== null;
    };

    return (
        <Route
            {...rest}
            render={props =>
                !isAuthenticated() ? (
                    <Component {...props} method={method} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/clients',
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

export default PublicRoute;