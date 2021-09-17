
import React from "react";
import { Route, Redirect } from "react-router-dom";


const ProtectedRoute = ({ auth:Auth, component: Component, ...rest }) => {
  const auth = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth) return <Component {...props} />;
        if (!auth) return <Redirect to="/register" />
   
      }}
    />
  );
};


export default ProtectedRoute;