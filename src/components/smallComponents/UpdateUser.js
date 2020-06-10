import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";


import { Context } from "../../store/Store";

function UpdateName() {
  // State voor evt error bij foute password
  const [isError, setIsError] = useState(false);

  // Data versturen naar global state
  const [state, dispatch] = useContext(Context);

  // State voor form gegevens
  const [name, setName] = useState(state.user.name);

  // Displayen van evt error
  const [displayErr, setDisplayErr] = useState("");

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
      .patch(
        `http://api.tasksy.com:8000/users/me`,
        {
          name: name,
        },
        {
          headers: {
            // Verstuur header request met de juiste token!
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          swal("Succeeded!", "We saved your name!", "success");

          // console.log(res.data);

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
      <label>
        Name
        <input
          required={true}
          name="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        ></input>
      </label>
      <button type="submit">Save</button>
      {isError && <p className="error">{displayErr}</p>}
    </form>
  );
}

export default UpdateName;
