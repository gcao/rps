import React from 'react';

const Layout = ({ children }) => (
  <div>
    <div className="logo-container">
      <img src="/images/rps-logo.png" alt="Logo" className="logo" />
    </div>
    <div className="header">
      <h1>Welcome to Rock Paper Scissors: YOU vs THE MACHINE</h1>
    </div>
    {children}
  </div>
);

export default Layout;
