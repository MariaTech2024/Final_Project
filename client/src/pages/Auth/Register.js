import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './register.css';

const Register = () => {
  // State hooks for managing form inputs, success message, and error message
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Function to handle the registration process
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Basic validation to check if all fields are filled
    if (!username || !email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    try {
      // Make a POST request to the register endpoint with the username, email, and password
      const response = await fetch('http://localhost:5000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      // Check if the response is okay (i.e., registration successful)
      if (response.ok) {
        setSuccessMessage('Registration successful');
        setErrorMessage(""); // Clear any previous error message
      } else {
        // Handle specific error cases
        if (response.status === 409) {
          setErrorMessage('User already exists');
        } else {
          console.error('Registration failed');
          setErrorMessage('Registration failed');
        }
        setSuccessMessage(""); // Clear any previous success message
      }
    } catch (error) {
      // Handle any other errors during the registration process
      console.error('Error during registration:', error);
      setErrorMessage('Error during registration');
      setSuccessMessage(""); // Clear any previous success message
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-left">
          <h1>Register</h1>
          {/* Display success message if there is one */}
          {successMessage && <p className="success-message">{successMessage}</p>}
          {/* Display error message if there is one */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Update username state on change
              className="register-input"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state on change
              className="register-input"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state on change
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