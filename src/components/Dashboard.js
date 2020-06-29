import React, { useContext, useEffect, useState } from "react";
import axios from "axios";


import Task from "./smallComponents/tasks/Task";
import TasksContainer from "./smallComponents/tasks/TasksContainer";

import Form from "./smallComponents/tasks/TaskForm";
import Menu from "./smallComponents/partials/Menu";
import LoadingLoop from "../components/animations/Loading";

// Geef de context mee van de user state
import { Context } from "../store/Store";

function Dashboard() {
  const [state, dispatch] = useContext(Context);
  const [loading, setLoading] = useState(true);

  /*
  FOR NEW PAGES KEEP THE FOLLOWING STRUCTURE***
  main 
    menu
    main
      content...
  See JSX
  */

  let token = document.cookie.replace(
    /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  ).replace("[", "").replace("]","");


  const getTasks = async () => {

    await axios
      .get(`${process.env.API_URL}/tasks`, {
        headers: {
          // Verstuur header request met de juiste token!
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => dispatch({ type: "SET_TASKS", payload: res.data })) //Verstuur user data naar global state!
      .catch((err) => console.log(err));

      
  };

  useEffect(() => {
    // Immediately invoked async function expression
    // Omdat ik eerst de data van de user wil hebben.

    (async () => {
      await axios
        .get(`${process.env.API_URL}/users/me`, {
          headers: {
            // Verstuur header request met de juiste token!
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          dispatch({ type: "SET_USER", payload: res.data });
        }) //Verstuur user data naar global state!
        .catch((err) => console.log(err));
      getTasks();
    })();

    setLoading(false)
  }, []);

  // Filter array and send array back with incompleted todo's
  const incompletedTask = state.tasks.filter(
    (task) => task.completed === false
  );



  return (
    <div className="dashboard">
      <div className="welcome-container">
        <h1 className="welcome-title">{`Hello ${
          state.user.name ? state.user.name : "..."
        }!`}</h1>
        <img
          src={`${`${process.env.API_URL}/users/${state.user._id}/avatar`}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/assets/profile.svg";
          }}
        ></img>
      </div>
      <main>
        <Menu />
        <div className="main">
          <h2>Home</h2>
          <Form callback={getTasks} />
          <TasksContainer>
            {loading && <LoadingLoop/>}
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
          </TasksContainer>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
