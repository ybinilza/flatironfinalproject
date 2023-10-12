import React, { useState } from 'react';
import './Loginpage.css';

function LoginPage() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [login, setLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
          setLogin((prevLogin) => !prevLogin);
          console.log(r);
          
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

  return (
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
  );
}

export default LoginPage;
