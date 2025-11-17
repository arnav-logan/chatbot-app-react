import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import MCLogo from "../assets/MC-logo.png";

export const Navbar = () => {
  const location = useLocation();

  return (
    <div className="navbar">
      <Link to="/" className={`home-icon`}>
        <img src={MCLogo} className="home-icon-logo" alt="React logo" />
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
          to="/login"
          className={location.pathname === "/login" ? "active" : ""}
        >
          Login
        </Link>
        <Link
          to="/signup"
          className={location.pathname === "/signup" ? "active" : ""}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};
