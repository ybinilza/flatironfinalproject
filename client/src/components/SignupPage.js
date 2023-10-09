import React from 'react'
import './SignupPage.css'
import { useState } from 'react';

function SignupPage() {

  const [username, setUsername] = useState("");
  const [email, setEmail] =useState("");
  const [password, setPassword] = useState("");

/*
 cnsole.log(username)
 console.log(email)
 console.log(password)
*/

function handleSubmit(e)
{
  e.preventDefault();
  console.log(username)
  console.log(email)
  console.log(password)
  
}

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
    </div>
  );
}

export default SignupPage
