import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

function DeleteAvatar() {
  // State voor evt error bij foute password
  const [isError, setIsError] = useState(false);

  // Displayen van evt error
  const [displayErr, setDisplayErr] = useState("");

  // token had to replace brackets
  let token = document.cookie.replace(
    /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  ).replace("[", "").replace("]","");

  /*
   The useHistory gives us access to the history object 
   which helps us programmatically navigate or change routes.
   */

  const history = useHistory();

  // Submit handler
  function handleSubmit(e) {
    e.preventDefault();

    // Send user name to server
    axios
      .delete(
        `${process.env.API_URL}/users/me/avatar`,
          {
          headers: {
            // Verstuur header request met de juiste token!
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          swal("Deleted!", "No face, no case..", "success");

          // console.log(res.data);

          // Push new route in history object
          history.push("/dashboard");
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
      <label>Delete avatar</label>
      <button type="submit" className="error-btn">Delete</button>
      {isError && <p className="error">{displayErr}</p>}
    </form>
  );
}

export default DeleteAvatar;
