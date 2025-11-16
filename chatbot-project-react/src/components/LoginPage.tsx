import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // <-- error message state

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      setError("Error: All fields must be filled.");
      return;
    }

    setError(""); // clear error if valid
    console.log("Login attempt:", email, password);

    navigate("/chatbot");
  };

  return (
    <div className="page-wrapper">
      <div className="form-card">
        <h2 className="login-title">Login</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="input-box"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="input-box"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="button-primary" type="submit">
            Login
          </button>

          {/* Error Message */}
          {error && <p className="error-text">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;


