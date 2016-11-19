import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import ComputerPlayer from '../components/computer-player'

class ComputerPlayerPage extends Component {
  render() {
    return (
      <div>
        <ComputerPlayer/>
        <Link to='/'>Back</Link>
      </div>
    )
  }
}

export default connect()(ComputerPlayerPage)
