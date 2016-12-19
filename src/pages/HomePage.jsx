import React, { Component } from 'react'
import { Link } from 'react-router'
import Home from '../components/home'

export default class Homepage extends Component {
  render() {
    return (
      <div>
        <p>
          If you haven't, <Link to='/action-trainer'>train the gesture detector</Link> first.
        </p>
        <p>
          You can also <Link to='/computer-player'>play with the machine without camera</Link>.
        </p>
        <Home/>
      </div>
    )
  }
}
