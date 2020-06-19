import React from "react";
import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <section className="menu-section">
      <h2>Menu</h2>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              activeStyle={{
                fontWeight: "bold",
                background: "-webkit-linear-gradient(45deg, #6c63ff, #57a7ff)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              activeStyle={{
                fontWeight: "bold",
                background: "-webkit-linear-gradient(45deg, #6c63ff, #57a7ff)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tasks"
              activeStyle={{
                fontWeight: "bold",
                background: "-webkit-linear-gradient(45deg, #6c63ff, #57a7ff)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Completed Tasks
            </NavLink>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Menu;
