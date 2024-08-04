/*global localStorage */

import React, { Component } from 'react'
import { getComputerPlayer } from '../common/computer-player'

class ComputerPlayerSwitcher extends Component {
  constructor(props) {
    super(props)
    this.state = { opponent: getComputerPlayer().name }
  }

  componentDidMount() {
    const savedOpponent = localStorage.getItem('opponent')
    if (savedOpponent) {
      this.setState({ opponent: savedOpponent })
    }
  }

  handleOpponentChange = (event) => {
    const newOpponent = event.target.value
    this.setState({ opponent: newOpponent })
    localStorage.setItem('opponent', newOpponent)
  }

  render() {
    return (
      <div>
        Choose your opponent &nbsp;&nbsp;
        <select className='ui dropdown' value={this.state.opponent} onChange={this.handleOpponentChange}>
          <option value="DQN Player">DQN Player</option>
          <option value="CNN Player">CNN Player</option>
          <option value="Dummy Player">Dummy Player</option>
        </select>
      </div>
    )
  }
}

export default ComputerPlayerSwitcher
