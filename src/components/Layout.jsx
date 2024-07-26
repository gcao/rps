import React from 'react'
import { Link } from 'react-router'

const Layout = ({ children }) => (
  <div>
    <div className="logo-container">
      <Link to="/">
        <img src="/images/rps-logo.png" alt="Logo" className="logo" />
      </Link>
    </div>
    <div className="header">
      <h1>Welcome to Rock Paper Scissors: YOU vs THE MACHINE</h1>
    </div>
    {children}
  </div>
)

export default Layout
