import React from 'react';
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, component: Component, path, ...rest }) => {
   return (
      <Route path={path} {...rest}
         render={(props) => {
            if (isAuthenticated) {
               return <Component />;
            } else {
               return <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
            }
         }} />
   )
}

export default ProtectedRoute
