import React from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <span className="navbar-logo">✅</span>
        <span className="navbar-title">Todo List</span>
      </div>
    </nav>
  );
};

export default Navbar;
