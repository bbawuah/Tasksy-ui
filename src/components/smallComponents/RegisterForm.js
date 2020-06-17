import React, { useState, useContext, useRef } from "react";
import { useTransition, useSpring, useChain, config } from "react-spring";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { useHistory } from "react-router-dom";

import { Container } from "../../styles/styled-components/styles";

import { Context } from "../../store/Store";

function RegisterForm({bool}) {
  // State voor eventuele error bij foute password
  const [isError, setIsError] = useState(false);
  // State om te checken of gebruiker is ingelogdd
  const [ingelogd, setIngelogd] = useState(false);

  const [open, set] = useState(false);

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
    headers.append("credentials", "include");
    headers.append("Access-Control-Allow-Credentials", "true");
    // Send user login to server
    axios
      .post(
        `https://api.tasksy.work/users`,
        {
          name: name,
          age: age,
          email: email,
          password: passwordOne,
        },
        {
          headers: headers,
        }
      )
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

  const component = "Login";

  const springRef = useRef();

  const { size, opacity, ...rest } = useSpring({
    ref: springRef,
    config: config.stiff,
    from: { size: "50%", background: "#6C63FF", cursor:"pointer" },
    to: {
      size: bool ? "100%" : "50%",
      background: bool ? "rgba(0,0,0,0.0)" : "#6C63FF",
      cursor: bool ? "default" : "pointer"
    },
  });

  const transRef = useRef();
  const transitions = useTransition(
    bool ? component : [],
    (item) => item.name,
    {
      ref: transRef,
      unique: true,
      trail: 100,
      from: { opacity: 0, transform: "scale(0)" },
      enter: { opacity: 1, transform: "scale(1)" },
      leave: { opacity: 0, transform: "scale(0)" },
    }
  );

  useChain(bool ? [springRef, transRef] : [transRef, springRef], [
    0,
    bool ? 0.1 : 0.6,
  ]);

  return (
    <Container
      style={{ ...rest, width: size }}
    >
      {transitions.map(({ key, props }) => (
        <form onSubmit={handleSubmit}
        key={key} style={{ ...props }}
        >
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
      ))}
    </Container>
  );
}

export default RegisterForm;
