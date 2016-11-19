import React, { Component } from 'react'
import { Link } from 'react-router'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { ReducerGroup } from '../reducers'

class HomePage extends Component {
  constructor(props) {
    super(props)

    let reducers = new ReducerGroup()
    const initialState = {
    }

    this.store = createStore(reducers.handle, initialState)
  }

  render() {
    return (
      <Provider store={this.store}>
        <div className='links'>
          <p>
            <Link to='/action-trainer'>Training the machine to recognize my action.</Link>
          </p>
          <p>
            <Link to='/computer-player'>Play with the machine(no camera version).</Link>
          </p>
        </div>
      </Provider>
    )
  }
}

export default HomePage
