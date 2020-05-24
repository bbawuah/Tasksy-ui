import React, { useContext, useEffect } from "react";
import axios from "axios";
import dotenv from 'dotenv'

dotenv.config()


import Task from "./smallComponents/Task";
import TasksContainer from "./smallComponents/TasksContainer";
import Footer from "././smallComponents/Footer";
import Form from "./smallComponents/TaskForm";
import Menu from "./smallComponents/Menu";

// Geef de context mee van de user state
import { Context } from "../store/Store";

function Dashboard() {
  const [state, dispatch] = useContext(Context);

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
    // Immediately invoked async function expression
    // Omdat ik eerst de data van de user wil hebben.
    (async () => {
      await axios
        .get(`https://api.tasksy.work/users/me`, {
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
  }, []);

  // Filter array and send array back with incompleted todo's
  const incompletedTask = state.tasks.filter(
    (task) => task.completed === false
  );

  // console.log(state);
  // console.log(state);

  return (
    <div className="dashboard">
      <div className="welcome-container">
        <h1 className="welcome-title">{`Hello ${
          state.user.name ? state.user.name : "..."
        }!`}</h1>
        <img
          src={`${`https://api.tasksy.work/users/${state.user._id}/avatar`}`}
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
      <Footer />
    </div>
  );
}

export default Dashboard;
