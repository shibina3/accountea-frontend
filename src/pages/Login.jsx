import React from 'react'
import {  Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className="center">
      <h1>Login</h1>
      <form>
        <div className="txt_field">
          <input type="text" required />
          <span></span>
          <label>Email/Username</label>
        </div>
        <div className="txt_field">
          <input type="password" required></input> 
          <span></span>
          <label>Password</label>
        </div>
        <div className="pass">Forgot Password?</div>
        <input type="submit" value="Login"></input>
        <div className="login_link">
           Don't have an account? <Link to="/signup">Signup</Link>
        </div>
      </form>
    </div>
  )
}
