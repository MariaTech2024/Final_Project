import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './register.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    // Simulating register action without Redux
    console.log("Registering with:", { username, email, password });
    // You can replace the console.log with your actual register logic
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-left">
          <h1>Register</h1>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="register-input"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="register-input"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="register-input"
            />
            <button type="submit" className="register-button">Register</button>
          </form>
        </div>
        <div className="register-right">
          <h1>Welcome to the discussion platform!</h1>
          <p>
            Here, you can ask questions, seek advice, and share your knowledge. Get answers to your queries, explore a wide range of topics, and contribute to a pool of collective knowledge.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button className="register-button">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;