// Core
import React, {useContext} from "react";
// Router
import {Navigate} from "react-router-dom";
// Context
import {AuthContext} from "@context/AuthContext.tsx";

/**
 * This component is used to protect routes that require authentication
 * @param RouteComponent The component that will be rendered if the user is authenticated
 * @param rest The rest of the props
 * @constructor
 */
const RequireAuth = ({component: RouteComponent, ...rest}: {component: React.FC}) => {

    const user = useContext(AuthContext);

    if (!user) {
        return <Navigate to={"/login"} replace/>
    }
    else {
        return <RouteComponent {...rest}/>
    }
}

export default RequireAuth;
