import "./HomePage.css";
import { Link } from "react-router-dom";
import { useEffect } from 'react';

export const HomePage = () => {
  useEffect(() => {
    document.title = "Minecraft AI";
  }, []);

  return (
    <div className="homepage-bg">
      <div className="homepage-content">
        <h1>
          Welcome to <span className="accent">Minecraft AI</span>
        </h1>
        <p>A quick and easy-to-use tool to learn and inquire about the popular sandbox game</p>
        <Link to="/chatbot">
          <button className="homepage-btn">Get Started</button>
        </Link>
      </div>
    </div>
  );
};
