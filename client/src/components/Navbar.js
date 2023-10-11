import React from 'react'
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
          <div className="logo-container">
            <img   src={require('../images/marketforeveyone.png')}  alt="Logo" className="logo" />
          </div>
          <div className="search-container">
            <input type="text" placeholder="Search" className="search-bar" />
          </div>
          <div className="buttons-container">
            
          <Link to="/login">
          <button>LogIn</button>
          </Link>
            
              <button >LogOut</button>
            
          </div>
        </nav>
      );
}
export default Navbar
