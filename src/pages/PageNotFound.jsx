import React from 'react'

export default function PageNotFound() {
  return (
    <div className='center'>
      <h1>404</h1>
      <div className='pageNotFound'>
        <h3>Looks like you're lost</h3>
        <p>the page you're looking for is not available!</p>
      </div>
      <div className='notFoundButton'>
        <a href="/" className="link_404">Go to Login</a>
      </div>
    </div>
  )
}
