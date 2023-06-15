import React, { useRef } from 'react'
import {  Link } from 'react-router-dom'
import { createBrowserHistory } from 'history';

export default function Signup() {
	const account_name = useRef(null);
	const email = useRef(null);
	const password = useRef(null);
	const history = createBrowserHistory();
	const submitSignup = async (event) => {
		event.preventDefault();
		try{
			if(account_name.current.value === '' || email.current.value === '' || password.current.value === ''){
				alert('Please enter all the fields')
			} else {
				await fetch(`${process.env.REACT_APP_BACKEND_URL}/create`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						// account_name: account_name.current.value,
						email: email.current.value,
						password: password.current.value
					})
				})
				.then(response => response.json())
                .then(data => {
                  if(data.detail){
                    alert(data.detail)
                  } else {
                    alert('You have been signed in successfully! Please login to continue');
					history.push('/');
                  }
                })
			}
		} catch (e) {
			console.log('Error submitting data:',e.message);
		}
	}

  return (
	<div className="center">
      <h1>Sign Up</h1>
      <form onSubmit={submitSignup}>
        <div className="txt_field">
          <input type="text" required ref={account_name} />
          <span></span>
          <label>Account name</label>
        </div>
		<div className="txt_field">
          <input type="email" required ref={email} /> 
          <span></span>
          <label>Email/Username</label>
        </div>
        <div className="txt_field">
          <input type="password" required ref={password} />
          <span></span>
          <label>Password</label>
        </div>
        <input type="submit" value="Create" />
		<div className="signup_link">
           Already have an account? <Link to="/">Login</Link>
        </div>
      </form>
    </div>
  )
}
