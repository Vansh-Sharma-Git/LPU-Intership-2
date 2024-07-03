// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><LogoutButton /></li>
      </ul>
    </nav>
  );
};

export default Navbar;
