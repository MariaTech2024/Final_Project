import React from 'react';
import { NavLink } from 'react-router-dom';
import './LeftSidebar.css'; 

const LeftSidebar = () => {
  return (
    <div className="left-sidebar">
      <div className="sidebar-section">
        <NavLink to="/" activeClassName="active-link">Home</NavLink>
      </div>
      <div className="sidebar-section">
        <NavLink to="/questions" activeClassName="active-link">Questions</NavLink>
      </div>
      <div className="sidebar-section">
        <NavLink to="/tags" activeClassName="active-link">Tags</NavLink>
      </div>
      <div className="sidebar-section">
        <NavLink to="/userProfile" activeClassName="active-link">Profile</NavLink>
      </div>
    </div>
  );
}

export default LeftSidebar;