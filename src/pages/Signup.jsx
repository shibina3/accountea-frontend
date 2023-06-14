import React from 'react'
import {  Link } from 'react-router-dom'

export default function Signup() {
  return (
	<div className="center">
      <h1>Sign Up</h1>
      <form>
        <div className="txt_field">
          <input type="text" required />
          <span></span>
          <label>Account name</label>
        </div>
		<div className="txt_field">
          <input type="email" required></input> 
          <span></span>
          <label>Email/Username</label>
        </div>
        <div className="txt_field">
          <input type="password" required></input> 
          <span></span>
          <label>Password</label>
        </div>
        <input type="submit" value="Create"></input>
		<div className="signup_link">
           Already have an account? <Link to="/">Login</Link>
        </div>
      </form>
    </div>
  )
}
