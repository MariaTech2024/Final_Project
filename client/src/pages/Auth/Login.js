import React, { useState } from 'react';
import { Link, Navigate } from "react-router-dom";
import "./login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      // If login is successful, set loggedIn to true
      setLoggedIn(true);
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  if (loggedIn) {
    return <Navigate to="/" />
  }

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
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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