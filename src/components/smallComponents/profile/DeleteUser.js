import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

import { Context } from "../../../store/Store";


function DeleteUser() {
  // State voor evt error bij foute password
  const [isError, setIsError] = useState(false);

  // Displayen van evt error
  const [displayErr, setDisplayErr] = useState("");


  const [state, dispatch] = useContext(Context);

  // token
  let token = document.cookie.replace(
    /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  ).replace("[", "").replace("]","");

  const history = useHistory();

  // Submit handler
  function handleSubmit(e) {
    e.preventDefault();

    // Send user name to server
    axios
      .delete(`${process.env.API_URL}/users/me`, {
        headers: {
          // Verstuur header request met de juiste token!
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          swal(
            "Thanks for using Tasksy!",
            "Friends never say goodbye.",
            "success"
          );

        dispatch({ type: "SET_USER", payload: "" });
          // console.log(res.data);
          localStorage.removeItem("tokens");

          history.push("/");
        }
      })
      .catch((err) => {
        setIsError(true); //State does not change
        console.log(isError);
        console.log(err);
        setDisplayErr(err);
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
      <label>Delete user</label>
      <button type="submit" className="error-btn">
        Delete
      </button>
      {isError && <p className="error">{displayErr}</p>}
    </form>
  );
}

export default DeleteUser;
