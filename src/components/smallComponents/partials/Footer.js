import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer>
    <div>
      <p>Built with ❤️ by <a href="https://www.brianbawuah.com" target="_blank">Brian Bawuah</a></p>
      <p>&copy; Copyrights {new Date().getFullYear()}. All rights reserved.</p>
    <ul>
      <li><Link to="/privacy">Privacy</Link></li>
      <li><Link to="/contact">Contact</Link></li>
    </ul>
    </div>
  </footer>
);

export default Footer;
