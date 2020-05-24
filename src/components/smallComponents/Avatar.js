import React, { useState, useContext, Fragment } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

import dotenv from 'dotenv'
dotenv.config()

import { Context } from "../../store/Store";
function UpdateAvatar() {
  // State voor evt error bij foute password
  const [isError, setIsError] = useState(false);

  // Data versturen naar global state
  const [state, dispatch] = useContext(Context);

  // State voor form gegevens
  const [img, setAvatar] = useState(state.user.name);

  // Displayen van evt error
  const [displayErr, setDisplayErr] = useState("");

  const history = useHistory();

  const token = JSON.parse(localStorage.getItem("tokens"));

  // Submit handler
  function handleSubmit(e) {
    e.preventDefault();

    // Send user name to server

    const avatar = new FormData();
    avatar.append("avatar", img);

    axios({
      method: "post",
      url: `${process.env.API_ENDPOINT}/users/me/avatar`,
      data: avatar,
      headers: {
        // Verstuur header request met de juiste token!
        "Content-Type": "multipart/form-data;",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        console.log("Posted picture!");
        swal("Succeeded!", "We saved your avatar!", "success");
        return history.push("/dashboard");
      })
      .catch(({ response }) => {
        setIsError(true);
        setDisplayErr(response.data.error);
      });

    /*
    console.log(err) Werkt niet..

    Probleem is wanneer de console.log de error probeert je printen,
    de 'string represantion' geprint wordt. Niet de object structure,

    Dus de .response property is niet te zien.
      */
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Profile picture
          <input
            required={true}
            name="avatar"
            type="file"
            onChange={(e) => setAvatar(e.target.files[0])}
          ></input>
        </label>
        <button type="submit">Save</button>
      </form>
      {isError && <p className="error">{displayErr}</p>}
    </Fragment>
  );
}

export default UpdateAvatar;
