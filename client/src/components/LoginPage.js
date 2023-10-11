import React from 'react'
import { useState } from 'react'

import './Loginpage.css'

function LoginPage() {



const[userName,setUserName]=useState("")
const[password,setPassword]=useState("")
const [errors, setErrors] = useState([]);
    
function handleLogin(e)
{   e.preventDefault();
    //console.log(userName)
    //console.log(password)
    
     fetch("/login",
     {
        method : 'POST',
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName, password }),
        }).then((r)=>
        {
            if(r.ok) 
            {
                console.log(r) //edit later
            }
            else{
                 alert("Invalid Username or Password")
                r.json().then((err) => console.log(err));
                //console.log(err.errors)
            }
        })




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
