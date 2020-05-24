import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";

import dotenv from 'dotenv'
dotenv.config()

import { Context } from "../../store/Store";

function Header() {
  const [state, dispatch] = useContext(Context);
  const history = useHistory();
  let token = document.cookie.replace(
    /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  ).replace("[", "").replace("]","");

  function logOut() {
    axios
      .post(`https://api.tasksy.work/users/logout`, {
        headers: {
          // Verstuur header request met de juiste token!
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch({ type: "SET_USER", payload: "" });

        
        document.cookie = "access_token=; max-age=- (any digit); path=/;";
        // console.log(state);
        // console.log(res);
      })
      .catch((err) => console.log(err));

    // console.log(state);
    // history.push("/");
    // return <Redirect to="/" />;
  }

  return (
    <header className="header">
      <Link to="/dashboard">
        <h1>Tasksy</h1>
      </Link>
      <nav>
        <ul>
          <li>
            {/* Als user is ingelogd, verander text dan naar logout!   */}
            {state.user.length === 0 ? (
              <Link to="/login">Login</Link>
            ) : (
              <Link to="/" onClick={logOut}>
                Logout
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
