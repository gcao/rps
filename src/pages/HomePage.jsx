import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class HomePage extends Component {
  render() {
    return (
      <div className='links'>
        <p>
          <Link to='/action-trainer'>Training the machine to recognize my action.</Link>
        </p>
        <p>
          <Link to='/computer-player'>Play with the machine(no camera version).</Link>
        </p>
      </div>
    )
  }
}

export default connect()(HomePage)
