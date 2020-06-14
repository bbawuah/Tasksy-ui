import React, { Fragment, useEffect, useState } from "react";
import swal from "sweetalert";

import LoginForm from "./smallComponents/LoginForm";
import RegisterForm from "./smallComponents/RegisterForm";
import Footer from "./smallComponents/Footer";

const CookieAlert = () =>
  swal(
    "Cookies",
    "this application uses cookies to improve your experience",
    "info"
  );

const login = () => {
  const [loginBool, setLoginBool] = useState(false);
  const [registerBool, setRegisterBool] = useState(false);

  useEffect(() => {
    (async () => {
      await CookieAlert();
    })();
  }, []);

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
          {!loginBool && <h3>Login</h3>}
          <LoginForm bool={loginBool} />
        </div>

        <div
          className="button-wrapper"
          onClick={() => {
            setLoginBool(() => false);
            setRegisterBool(() => true);
          }}
        >
          {!registerBool && <h3>Register</h3>}
          <RegisterForm bool={registerBool} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default login;
