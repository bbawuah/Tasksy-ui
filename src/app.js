import React, { useState } from "react";
import { render } from "react-dom";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import { AuthContext } from "./context/auth";

import Store from "./store/Store";

import Login from "./components/Login";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Header from "./components/smallComponents/Header";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import AllTasks from "./components/AllTasks";

function Routing() {

  let token = document.cookie.replace(
    /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  ).replace("[", "").replace("]","");

  const existingTokens = token;
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Store>
        <Router>
          <div>
            <Header />
            <Switch>
              <Route exact={true} path="/" component={Home} />
              <Route path="/login" component={Login} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/tasks" component={AllTasks} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Store>
    </AuthContext.Provider>
  );
}

render(<Routing />, document.getElementById("app"));
