import React, { Component } from 'react'
import { Link } from 'react-router'
import Home from '../components/home'
import ComputerPlayerSwitcher from '../components/ComputerPlayerSwitcher'

export default class Homepage extends Component {
  render() {
    return (
      <div>
        <div className="logo-container">
          <img src="/images/rps-logo.png" alt="Logo" className="logo" />
        </div>
        <div className="header">
          <h1>Welcome to Rock Paper Scissors: YOU vs THE MACHINE</h1>
        </div>

        <div>
          <br/>
          <br/>
          <p>
            If you haven't, <Link to='/action-trainer'>train the gesture detector</Link> first.
          </p>

          <p>
            <ComputerPlayerSwitcher />
          </p>

          <p>
            <Home />
          </p>

          <p>
            You can also <Link to='/computer-player'>play with the machine without camera</Link>.
          </p>
        </div>
      </div>
    )
  }
}
