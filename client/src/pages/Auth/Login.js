import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./login.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulating login action without Redux
    console.log("Logging in with:", { username, password });
    // You can replace the console.log with your actual login logic
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-left">
          <h1>Welcome to the discussion platform!</h1>
          <p>
            Here, you can ask questions, seek advice, and share your knowledge. Get answers to your queries, explore a wide range of topics, and contribute to a pool of collective knowledge.
          </p>
          <span>Don't have an account?</span>
          <Link to="/register">
            <button className="login-button">Register</button>
          </Link>
        </div>
        <div className="login-right">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
            <button type="submit" className="login-button">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;