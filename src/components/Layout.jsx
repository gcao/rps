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
      <h1>Welcome to Rock Paper Scissors: You vs The Machine</h1>
    </div>
    {children}
  </div>
)

export default Layout
