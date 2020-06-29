import React from "react";
import ContactIMG from "./smallComponents/partials/ContactIMG";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Contact = () => (
  <div className="contact">
    <h2>Contact</h2>
    <ContactIMG />
    <blockquote>
      <em>"Social media can also be used to make us more productive."</em>
    </blockquote>
    <ul>
      <li>
        <a href="https://www.instagram.com/tasksy/">
          {" "}
          <FontAwesomeIcon icon={["fab", "instagram"]} />
          @tasksy
        </a>
      </li>
      <li>
        <a href="https://www.facebook.com/Tasksy-100775608370969">
          {" "}
          <FontAwesomeIcon icon={["fab", "facebook"]} />
          Tasksy
        </a>
      </li>
      <li>
        <a href="https://twitter.com/tasksy">
          {" "}
          <FontAwesomeIcon icon={["fab", "twitter"]} />
          @tasksy
        </a>
      </li>
    </ul>
    <p>
      <small>
        Be sure to reach out at any time should you have any ideas, questions,
        or encounter any nasty bugs.
      </small>
    </p>
  </div>
);

export default Contact;
