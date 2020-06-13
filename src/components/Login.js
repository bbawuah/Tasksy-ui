import React, { Fragment, useEffect } from "react";
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
        <LoginForm />
        <RegisterForm />
      </div>
      <Footer />
    </div>
  );
};

export default login;
