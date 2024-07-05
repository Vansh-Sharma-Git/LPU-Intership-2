import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  // Ensure this import is here to apply the styles

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
