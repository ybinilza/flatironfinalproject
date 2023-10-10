import React from 'react'
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
          <div className="logo-container">
            <img src="path-to-your-logo.png" alt="Logo" className="logo" />
          </div>
          <div className="search-container">
            <input type="text" placeholder="Search" className="search-bar" />
          </div>
          <div className="buttons-container">
            {isLoggedIn ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <button onClick={handleLogin}>Login</button>
            )}
          </div>
        </nav>
      );

export default Navbar




