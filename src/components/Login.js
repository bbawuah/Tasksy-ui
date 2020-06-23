import React, { Fragment, useEffect, useState, useRef } from "react";
import swal from "sweetalert";

import LoginForm from "./smallComponents/user/LoginForm";
import RegisterForm from "./smallComponents/user/RegisterForm";
import Footer from "./smallComponents/partials/Footer";

const CookieAlert = () =>
  swal(
    "Cookies",
    "this application uses cookies to improve your experience",
    "info"
  );

const login = () => {
  const didUpdateRef = useRef(false);
  
  const [loginBool, setLoginBool] = useState(false);
  const [registerBool, setRegisterBool] = useState(false);
  ("");

  const [registerDisplay, setRegisterDisplay] = useState("Register");
  const [loginDisplay, setLoginDisplay] = useState("Login");

  useEffect(() => {
    (async () => {
      await CookieAlert();
    })();
  }, []);

  useEffect(() => {
    if (didUpdateRef.current) {
      if (!loginBool) {
        setTimeout(() => {
          setRegisterDisplay("");
          setLoginDisplay("Login");
        }, 1000);
      }

      if (!registerBool) {
        setTimeout(() => {
          setLoginDisplay("");
          setRegisterDisplay("Register");
        }, 1000);
      }
    } else didUpdateRef.current = true;
  });

  return (
    <div className="login">
      <section>
        <h2 className="welcome-title">First, we need some information</h2>
        <p>Login or register your account</p>
      </section>
      <div className="form-container">
        <div
          className="button-wrapper"
          onClick={() => {
            setLoginBool(() => true);
            setRegisterBool(() => false);
          }}
        >
          {!loginBool && <h3>{loginDisplay}</h3>}
          <LoginForm bool={loginBool} />
        </div>

        <div
          className="button-wrapper"
          onClick={() => {
            setLoginBool(() => false);
            setRegisterBool(() => true);
          }}
        >
          {!registerBool && <h3>{registerDisplay}</h3>}
          <RegisterForm bool={registerBool} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default login;
