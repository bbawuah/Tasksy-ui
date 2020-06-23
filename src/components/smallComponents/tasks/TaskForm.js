import React, { useState } from "react";
import axios from "axios";


const Form = ({ callback }) => {
  const [description, setDescription] = useState("");

  let token = document.cookie.replace(
    /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  ).replace("[", "").replace("]","");

  function handleSubmit(e) {
    e.preventDefault();
    // Send tasks to server
    axios
      .post(
        `${process.env.API_URL}/tasks`,
        {
          description: description,
          completed: false,
        },
        {
          headers: {
            // Verstuur header request met de juiste token!
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          //   dispatch({ type: "SET_TASKS", payload: res.data.tasks });

          console.log(res);
        }
      })
      .catch(({ response }) => {
        console.log(response);
      });

    document.getElementById("task-form").reset();
    return callback();
  }
  return (
    <form onSubmit={handleSubmit} id="task-form">
      <label>
        Do you have a new task?
        <textarea
          name="name"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </label>
      <button type="submit">Post!</button>
    </form>
  );
};

export default Form;
