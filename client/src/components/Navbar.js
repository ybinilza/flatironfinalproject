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
          
        
          <Link to = "/signup">
            <button>Sign Up</button>
          </Link>

          <Link to="/login">
          <button>LogIn</button>
          </Link>
            
          <Link to="/logout">
            <button>Logout</button>
          </Link>
            
          </div>
        </nav>
      );
}
export default Navbar
