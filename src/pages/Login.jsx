import React, { useRef } from 'react'
import {  Link } from 'react-router-dom'
import { createBrowserHistory } from 'history';

export default function Login() {
  const email = useRef(null);
  const password = useRef(null);
  const history = createBrowserHistory();
  const submitLogin = async (event) => {
    event.preventDefault();
    try{
      if(email.current.value === '' || password.current.value === ''){
        alert('Please enter all the fields')
      } else {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email.current.value,
            password: password.current.value
          })
        })
        .then(response => response.json())
        .then(data => {
          if(data.status === 200){
            localStorage.setItem('token', data.access_token);
            history.push('/income/add');
          } else {
            alert('Login Failed');
          }
        })
      }
    } catch (e) {
      console.error('Error submitting data:',e.message);
    }
  }
  return (
    <div className="center">
      <h1>Login</h1>
      <form onSubmit={submitLogin}>
        <div className="txt_field">
          <input type="text" required ref={email} />
          <span></span>
          <label>Email/Username</label>
        </div>
        <div className="txt_field">
          <input type="password" required ref={password}></input> 
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
