import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './Loginpage.css';
import EachPersonPage from './EachPersonPage';

function LoginPage({setUserLogin}) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [login, setLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const history =useHistory()

  function handleLogin(e) {
    e.preventDefault();

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName, password }),
    })
      .then((r) => {
        if (r.ok) {
          //setLogin((prevLogin) => !prevLogin);
          setLogin(true)
          console.log(r);
          history.push('/eachperson')
          
        } else {
          r.json().then((err) => {
            setErrors(err.errors || []);
            setErrorMessage(err.error || 'An error occurred.');
          });
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        setErrorMessage('An unexpected error occurred.');
      });
  }
 {<Route component={EachPersonPage} path="/eachPersonPage" />}
  return (
    <Router>
      {login ? (
        <Route component={EachPersonPage} path="/eachPersonPage" />
      ) : (
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
  
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
  
            <button type="submit">Login</button>
          </form>
  
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {errors.length > 0 && (
            <ul className="error-list">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </Router>
  );
  
}

export default LoginPage;

