import React from 'react'
import { useState } from 'react'

function LoginPage() {



const[userName,setUserName]=useState("")
const[password,setPassword]=useState("")
    
function handleLogin(e)
{   e.preventDefault();
    console.log(userName)
    console.log(password)
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
              onChange={(e)=>setUserName(e.target.value)}
            />
    
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
    
            <button type="submit">Login</button>
          </form>
        </div>
      );
    };

export default LoginPage
