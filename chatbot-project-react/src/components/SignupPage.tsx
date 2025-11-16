import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";

const SignupPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // <-- error message

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password || !confirmPassword) {
      setError("Error: All fields must be filled.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Error: Passwords do not match.");
      return;
    }

    setError(""); // clear error
    console.log("Signup attempt:", email, password, confirmPassword);

    navigate("/chatbot");
  };

  return (
    <div className="page-wrapper">
      <div className="form-card">
        <h2 className="signup-title">Sign Up</h2>

        <form className="signup-form" onSubmit={handleSubmit}>
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

          <input
            type="password"
            className="input-box"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className="button-primary" type="submit">
            Create Account
          </button>

          {/* Error Message */}
          {error && <p className="error-text">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignupPage;




