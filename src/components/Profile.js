import React, { useContext, useEffect } from "react";
import axios from "axios";


import Menu from "./smallComponents/partials/Menu";
import UpdateName from "./smallComponents/profile/UpdateUser";
import UpdateAvatar from "./smallComponents/profile/Avatar";
import DeleteAvatar from "./smallComponents/profile/DeleteAvatar";
import DeleteUser from "./smallComponents/profile/DeleteUser"

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
        .get(`${process.env.API_URL}/users/me`, {
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
    </div>
  );
}

export default Profile;
