import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import reactLogo from "../assets/react.svg";

export const Navbar = () => {
  const location = useLocation();

  return (
    <div className="navbar">
      <Link to="/" className={`home-icon`}>
        <img src={reactLogo} className="home-icon-logo" alt="React logo" />
      </Link>
      <div className="navbar-spacer" />
      <div className="navbar-links">
        <Link
          to="/chatbot"
          className={location.pathname === "/chatbot" ? "active" : ""}
        >
          Chatbot
        </Link>
        <Link
          to="/about"
          className={location.pathname === "/about" ? "active" : ""}
        >
          About
        </Link>
      </div>
    </div>
  );
};
