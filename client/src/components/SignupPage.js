import React from 'react'
import './SignupPage.css'
import { useState } from 'react';

function SignupPage({ onLogin }) {

  const [username, setUsername] = useState("");
  const [email, setEmail] =useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


function handleSubmit(e)
{
  e.preventDefault();
  setIsLoading(true);
  /*console.log(username)
  console.log(email)
  console.log(password)*/

  fetch("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  }).then((r) => {
    setIsLoading(false);
    if (r.ok) {
      r.json().then((user) => {
        onLogin(user);
        setErrors([]);   // Reset errors when the form is submitted successfully
      });
    } else {
      r.json().then((err) => setErrors(err.errors || []));
    }
  });
}

console.log(errors)

  return (
    <div>
      <div className="signup-container">
        <form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <label htmlFor="username">Username:</label>
          <input type="text"
                id="username" 
                name="username" required
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                 />

          <label htmlFor="email">Email:</label>
          <input type="email" 
                  id="email" 
                  name="email" required
                  value={email}
                  onChange={(e) =>setEmail(e.target.value)} />

          <label htmlFor="password">Password:</label>
          <input type="password" 
                 id="password" 
                 name="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)} />

          <input type="submit" value="Sign Up" />
        </form>
      </div>
      {isLoading && <p>Loading...</p>}
      {errors.length > 0 && (
        <div>
          <p>Error:</p>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
export default SignupPage
