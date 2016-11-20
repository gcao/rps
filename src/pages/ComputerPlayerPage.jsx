import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import ComputerPlayer from '../components/computer-player'

class ComputerPlayerPage extends Component {
  render() {
    return (
      <div>
        <ComputerPlayer/>
        <p>
          <Link to='/'>Back</Link>
        </p>
      </div>
    )
  }
}

export default connect()(ComputerPlayerPage)
