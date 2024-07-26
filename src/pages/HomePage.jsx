import React, { Component } from 'react'
import { Link } from 'react-router'
import Home from '../components/home'
import ComputerPlayerSwitcher from '../components/ComputerPlayerSwitcher'
import Layout from '../components/Layout'

export default class Homepage extends Component {
  render() {
    return (
      <Layout>
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
      </Layout>
    )
  }
}
