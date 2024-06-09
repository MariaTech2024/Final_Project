import React, { useState } from 'react';
import { Link, Navigate } from "react-router-dom";
import "./login.css";

const LoginPage = () => {
  // State hooks for managing form inputs, error message, login status, and loading state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to handle the login process
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    setLoading(true); // Set loading state to true to indicate the login process has started
    setError(null); // Clear any previous errors

    try {
      // Make a POST request to the login endpoint with the email and password
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if the response is not okay (i.e., login failed)
      if (!response.ok) {
        throw new Error('Login failed');
      }

      // If login is successful, update the loggedIn state to true
      setLoggedIn(true);
    } catch (error) {
      // If there is an error (e.g., invalid email or password), set the error message
      setError('Invalid email or password');
    } finally {
      // Set loading state back to false as the login process is complete
      setLoading(false);
    }
  };

  // If the user is logged in, navigate to the home page
  if (loggedIn) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-left">
          <h1>Welcome to the discussion platform!</h1>
          <p>
            Here, you can ask questions, seek advice, and share your knowledge.
            Get answers to your queries, explore a wide range of topics, and
            contribute to a pool of collective knowledge.
          </p>
          <span>Don't have an account?</span>
          <Link to="/register">
            <button className="login-button">Register</button>
          </Link>
        </div>
        <div className="login-right">
          <h1>Login</h1>
          {/* Display error message if there is one */}
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state on change
              className="login-input"
              required // Make this field required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state on change
              className="login-input"
              required // Make this field required
            />
            <button type="submit" className="login-button" disabled={loading}>
              {/* Display 'Logging in...' while loading, otherwise 'Login' */}
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;