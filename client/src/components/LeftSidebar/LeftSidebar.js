import React from 'react';
import { NavLink } from 'react-router-dom';
import './LeftSidebar.css'; 

const LeftSidebar = () => {
  return (
    <div className="left-sidebar">
      <div className="sidebar-section">
        <NavLink to="/" activeclassname="active-link">Home</NavLink>
      </div>
      <div className="sidebar-section">
        <NavLink to="/questions" activeclassname="active-link">Questions</NavLink>
      </div>
      <div className="sidebar-section">
        <NavLink to="/tags" activeclassname="active-link">Tags</NavLink>
      </div>
      <div className="sidebar-section">
        <NavLink to="/userProfile" activeclassname="active-link">Profile</NavLink>
      </div>
    </div>
  );
}

export default LeftSidebar;