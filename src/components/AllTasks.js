import React, { useContext, useEffect } from "react";
import axios from "axios";
import dotenv from 'dotenv'

dotenv.config()

import Menu from "./smallComponents/Menu";
import Footer from "./smallComponents/Footer";
import Task from "./smallComponents/Task";
import { Context } from "../store/Store";

function AllTasks() {
  const [state, dispatch] = useContext(Context);
  const token = JSON.parse(localStorage.getItem("tokens"));

  const getTasks = () => {
    return axios
      .get(`https://api.tasksy.work/tasks`, {
        headers: {
          // Verstuur header request met de juiste token!

          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => dispatch({ type: "SET_TASKS", payload: res.data })) //Verstuur user data naar global state!
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`https://api.tasksy.work/users/me`, {
        headers: {
          // Verstuur header request met de juiste token!
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => dispatch({ type: "SET_USER", payload: res.data })) //Verstuur user data naar global state!
      .catch((err) => console.log(err));

    getTasks();
  }, []);

   // Filter array and send array back with incompleted todo's
   const incompletedTask = state.tasks.filter(
    (task) => task.completed === true
  );

  return (
    <div className="dashboard">
      <h1 className="welcome-title">Tasks overview</h1>
      <main>
        <Menu />
        <div className="main">
          <h2>Completed tasks</h2>
          {incompletedTask.map((task) => (
              <Task
                key={task._id}
                taskID={task._id}
                callback={getTasks}
                completed={task.completed}
                description={task.description}
                date={task.createdAt}
              />
            ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AllTasks;
