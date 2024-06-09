import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/logo.png';
import SearchBar from '../SearchBar/SearchBar'; 

const Header = () => {
    // State to track if the user is logged in
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Change to false if initially logged out

    // Function to handle logout
    const handleLogout = () => {
        // Your logout logic goes here, e.g., clearing authentication tokens, etc.
        // For now, let's just update the state to indicate the user is logged out
        setIsLoggedIn(false);
    };

    return (
        <header className="header">
            <div className="logo">
                <img src={logo} alt="logo" className="logo-img" />
            </div>
            <nav className="nav">
                {/* Navigation links */}
                <ul className="nav-list">
                    <li><a href="/home" className="nav-link">Discussion Platform for olim</a></li>
                </ul>
            </nav>
            <SearchBar /> {/* Replace the static search bar with the SearchBar component */}
            <div className="auth-buttons">
                {/* Conditional rendering based on user's authentication status */}
                {isLoggedIn ? (
                    // If user is logged in, show logout button
                    <button type="button" className="logout-button" onClick={handleLogout}>Log Out</button>
                ) : (
                    // If user is logged out, show login button that redirects to the login page
                    <Link to="/login">
                        <button type="button" className="login-button">Log In</button>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;