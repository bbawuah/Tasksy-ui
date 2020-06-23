import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";


export default function Task({
  description,
  date,
  taskID,
  completed,
  callback,
}) {

  let token = document.cookie.replace(
    /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  ).replace("[", "").replace("]","");

  // Delete task
  const deleteTask = () => {
    // console.log(taskID)

    axios
      .delete(`${process.env.API_URL}/tasks/${taskID}`, {
        headers: {
          // Verstuur header request met de juiste token!
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        swal("Deleted", "You have deleted this task", "success");
        console.log("Deleted!");
        return callback();
      })
      .catch((err) => console.log(err));
  };

  // Update task
  const updateTask = () => {
    axios
      .patch(
        `${process.env.API_URL}/tasks/${taskID}`,
        {
          completed: true,
        },
        {
          headers: {
            // Verstuur header request met de juiste token!
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        swal("Good job!!", "You have completed this task🔥🔥", "success");
        // console.log(res);
        console.log("Updated!");
        return callback();
      })
      .catch((err) => {
        console.log(err);
        console.log("Oeps");
      });
  };

  const restoreTask = () => {
    axios
      .patch(
        `${process.env.API_URL}/tasks/${taskID}`,
        {
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
        swal("Fixed it!!", "You can find this task on your dashboard.", "success");
        // console.log(res);
        console.log("Updated!");
        return callback();
      })
      .catch((err) => {
        console.log(err);
        console.log("Oeps");
      });
  };


  return (
    <div className="task">
      <div className="task-text">
        <p>{description}</p>

        <small>{new Date(date).toDateString()}</small>
      </div>
      <div className="btn-container">
        <button onClick={deleteTask} className="error-btn">Delete</button>
        <button onClick={completed ? restoreTask : updateTask}>{completed ? "Undo" : "Completed"}</button>
      </div>
    </div>
  );
}
