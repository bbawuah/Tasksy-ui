import React, { useState, useContext } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { useHistory } from "react-router-dom";
// Ik importeer useHistory inplaats van Redirect want dit werkt voor mij

import dotenv from 'dotenv'
dotenv.config()

import { Context } from "../../store/Store";

function LoginForm({ props }) {
  const [isError, setIsError] = useState(false); //State does not change
  const [ingelogd, setIngelogd] = useState(false); //State does not change
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();
  const [displayErr, setDisplayErr] = useState("");
  const history = useHistory();
  const [state, dispatch] = useContext(Context);



  // Submit handler
  function postLogin(e) {
    e.preventDefault();
    // Send user login to server
    // Om de CORS Policy te te enables, geef ik de header nieuwe properties mee
    let headers = new Headers();
    headers.append(
      "credentials",
      "include"
    );
    
    // Post request naar server om in te loggen
    axios
      .post(
        `https://api.tasksy.work/users/login`,
        {
          email,
          password,
        },
        {
          headers: headers,
        }
      )
      .then((res) => {
        // Als server een status code van 200 terug stuurt
        if (res.status === 200) {
          // Zet dan de authTokens naar de res.data.token
          setAuthTokens(res.data.token);
          // Set de auth token als cookie
          document.cookie = `access_token=[${res.data.token}]; max-age=86400;`;
          // Zet state van ingelogd naar true
          setIngelogd(true);
          // Zet state van isError naar false (ivm Error);
          setIsError(false);
          // Vertsuur de data van de user naar de global state
          // Zodat we die kunnen gebruiken in het dashboard
          dispatch({ type: "SET_LOGIN", payload: true });
          dispatch({ type: "SET_USER", payload: res.data.user });

          // console.log(res.data);

          history.push("/dashboard");
        } else {
          setIsError(true); //State does not change
          console.log(isError);
        }
      })
      .catch(({ response }) => {
        /*
        console.log(err) Werkt niet..
    
        Probleem is wanneer de console.log de error probeert je printen,
        de 'string represantion' geprint wordt. Niet de object structure,
    
        Dus de .response property is niet te zien.
          */
        setIsError(true); //State does not change
        console.log(isError);
        console.log(response.data.error);
        setDisplayErr(response.data.error);
        //Send back error from server
        console.log(displayErr);
      });
  }

  return (
    <form onSubmit={postLogin}>
      <h3>Login</h3>
      <label>
        Email
        <input
          name="email"
          type="email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </label>

      <label>
        Password
        <input
          name="password"
          type="password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </label>

      <button type="submit">Login</button>
      {isError && <p className="error">{displayErr}</p>}
    </form>
  );
}

export default LoginForm;
