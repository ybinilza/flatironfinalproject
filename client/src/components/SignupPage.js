import React from 'react'
import './SignupPage.css'

function SignupPage() {
  return (
    <div>
      <div className="signup-container">
        <form action="#" method="post">
          <h2>Sign Up</h2>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />

          <input type="submit" value="Sign Up" />
        </form>
      </div>
    </div>
  );
}

export default SignupPage
