import React, { useState, useContext } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { useHistory } from "react-router-dom";

import { Context } from "../../store/Store";

function RegisterForm() {
  // State voor evt error bij foute password
  const [isError, setIsError] = useState(false);
  // State om te checken of gebruiker is ingelogd
  const [ingelogd, setIngelogd] = useState(false);

  // State voor form gegevens
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  // Set the auth tokens naar localStorage
  const { setAuthTokens } = useAuth();
  // Displayen van evt error
  const [displayErr, setDisplayErr] = useState("");

  const history = useHistory();

  // Data versturen naar global state
  const [state, dispatch] = useContext(Context);

  // Submit handler
  function handleSubmit(e) {
    e.preventDefault();


    
    // Password check
    if (passwordOne !== passwordTwo) {
      setIsError(true);
      return setDisplayErr("Password does not match");
    }
    
    let headers = new Headers();
    headers.append(
      "credentials",
      "include"
    );
    headers.append("Access-Control-Allow-Credentials", "true");
    // Send user login to server
    axios
      .post("http://localhost:8000/users", {
        name: name,
        age: age,
        email: email,
        password: passwordOne,
      },
      {
        headers: headers,
      })
      .then((res) => {
        if (res.status === 201) {
          // Zet dan de authTokens naar de res.data.token
          setAuthTokens(res.data.token);
          // Set de auth token als cookie
          document.cookie = `access_token=[${res.data.token}]; max-age=86400`;
          // Zet state van ingelogd naar true
          setIngelogd(true);
          // Zet state van isError naar false (ivm Error);
          setIsError(false);

          // Vertsuur de data van de user naar de global state
          // Zodat we die kunnen gebruiken in het dashboard
          dispatch({ type: "SET_LOGIN", payload: true });
          dispatch({ type: "SET_USER", payload: res.data.user });
          // console.log(res.data);

          /*
          De gebruiker moet nog worden doorgestuurd
          naar de dashboard pagina
          */

          history.push("/dashboard");
        }
      })
      .catch(({ response }) => {
        setIsError(true); //State does not change
        console.log(isError);
        console.log(response.data.error);
        setDisplayErr(response.data.error);

        console.log(displayErr);
      });

    /*
    console.log(err) Werkt niet..

    Probleem is wanneer de console.log de error probeert je printen,
    de 'string represantion' geprint wordt. Niet de object structure,

    Dus de .response property is niet te zien.
      */
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Register</h3>
      <label>
        Name
        <input
          required={true}
          name="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        ></input>
      </label>

      <label>
        Age
        <input
          name="age"
          type="number"
          onChange={(e) => setAge(e.target.value)}
        ></input>
      </label>

      <label>
        Email
        <input
          required={true}
          name="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </label>

      <label>
        Password
        <input
          required={true}
          name="password-one"
          type="password"
          onChange={(e) => setPasswordOne(e.target.value)}
        ></input>
      </label>

      <label>
        Password
        <input
          required={true}
          name="password-two"
          type="password"
          onChange={(e) => setPasswordTwo(e.target.value)}
        ></input>
      </label>
      <button type="submit">Register</button>
      {isError && <p className="error">{displayErr}</p>}
    </form>
  );
}

export default RegisterForm;
