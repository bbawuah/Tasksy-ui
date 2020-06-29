import React, { useState } from "react";
import { render } from "react-dom";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
 
library.add(fab, faCheckSquare, faCoffee)

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import { AuthContext } from "./context/auth";

import Store from "./store/Store";

import Login from "./components/Login";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Header from "./components/smallComponents/partials/Header";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import AllTasks from "./components/AllTasks";
import Privacy from "./components/Privacy";
import Contact from "./components/Contact";
import Footer from "./components/smallComponents/partials/Footer";

function Routing() {

  let token = document.cookie.replace(
    /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  ).replace("[", "").replace("]","");

  const existingTokens = token;
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
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
              <Route path="/contact" component={Contact}/>
              <Route path="/privacy" component={Privacy}/>
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/tasks" component={AllTasks} />
              <Route component={NotFound} />
            </Switch>
            <Footer/>
          </div>
        </Router>
      </Store>
    </AuthContext.Provider>
  );
}

render(<Routing />, document.getElementById("app"));
