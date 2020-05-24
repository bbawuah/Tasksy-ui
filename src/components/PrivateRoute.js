import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";

function PrivateRoute({ component: Component, ...rest }) {
  const { authTokens } = useAuth();
  
  
  return (
    <Route
    {...rest}
      //   Als authenticate true is, laat dan het component zien.
      // Anders redirect naar home pagina
      render={(props) =>
        authTokens ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;
