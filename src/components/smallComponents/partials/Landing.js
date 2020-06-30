import React from "react";
import { Link } from "react-router-dom";
import Trail from "../../animations/TrailAnimation";

const Landing = () => {
  return (
    <div className="landing-container">
      <img className="landing-img" src="/assets/tasksy-landing.svg"></img>
      <div className="landing-text">
        <h2><Trail str="A task management tool for achievers"/></h2>
        <p>
          Get the most out of your day by tracking your daily tasks.
        </p>
        <Link to="/login">Get Started!</Link>
      </div>
      
    </div>
  );
};

export default Landing;
