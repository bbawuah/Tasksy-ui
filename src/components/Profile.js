import React, { useContext, useEffect } from "react";
import axios from "axios";


import Menu from "./smallComponents/Menu";
import Footer from "./smallComponents/Footer";
import UpdateName from "./smallComponents/UpdateUser";
import UpdateAvatar from "./smallComponents/Avatar";
import DeleteAvatar from "./smallComponents/DeleteAvatar";
import DeleteUser from "./smallComponents/DeleteUser"

import { Context } from "../store/Store";

function Profile() {
  const [state, dispatch] = useContext(Context);
  let token = document.cookie.replace(
    /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  ).replace("[", "").replace("]","");

  useEffect(() => {
    (async () => {
      axios
        .get(`https://api.tasksy.work/users/me`, {
          headers: {
            // Verstuur header request met de juiste token!
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => dispatch({ type: "SET_USER", payload: res.data })) //Verstuur user data naar global state!
        .catch((err) => console.log(err));
    })();
  }, []);

  // console.log(state)
  
  return (
    <div className="dashboard profile">
      <h1 className="welcome-title">Personalize your profile</h1>
      <main>
        <Menu />
        <div className="main">
          <h2>Edit Profile</h2>
          <UpdateName />
          <UpdateAvatar />
          <DeleteAvatar/>
          <DeleteUser/>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
