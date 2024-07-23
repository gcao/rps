/*global localStorage */

import React, { Component } from 'react'

class ComputerPlayerSwitcher extends Component {
  constructor(props) {
    super(props)
    this.state = { playerType: 'default' }
  }

  componentDidMount() {
    const savedPlayerType = localStorage.getItem('playerType')
    if (savedPlayerType) {
      this.setState({ playerType: savedPlayerType })
    }
  }

  handlePlayerTypeChange = (event) => {
    const newPlayerType = event.target.value
    this.setState({ playerType: newPlayerType })
    localStorage.setItem('playerType', newPlayerType)
  }

  render() {
    return (
      <div>
        Choose your opponent &nbsp;&nbsp;
        <select className='ui dropdown' value={this.state.playerType} onChange={this.handlePlayerTypeChange}>
          <option value="Dqn Player">Dqn Player</option>
          <option value="Dummy Player">Dummy Player</option>
        </select>
      </div>
    )
  }
}

export default ComputerPlayerSwitcher
