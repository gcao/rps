import React, { Component } from 'react'
import { connect } from 'react-redux'

import ResultComponent from '../result'

import { addReducer, removeReducer } from '../../reducers'
import reducers from './reducers'
import * as actions from './actions'

class Home extends Component {
  constructor(props) {
    super(props)

    this.props.dispatch(addReducer(reducers))
  }

  componentDidMount() {
    this.props.dispatch(actions.initialize({
      videoElem: this.videoElem,
      canvasElem: this.canvasElem,
    }))
  }

  componentWillUnmount() {
    this.props.dispatch(removeReducer(reducers))
    this.props.dispatch(actions.destroy())
  }

  render() {
    return (
      <div>
        <p>
          <video autoPlay ref={elem => this.videoElem = elem}/>
        </p>
        <div id="training-container" style={{ display:'none' }}>
          <p>
            <img id='captured' src=""/>
          </p>
          <p id='not-recognized' style={{ display:'none' }}>Not recognized!</p>
        </div>
        <canvas style={{ display:'none' }} width="320px" height="240px" ref={elem => this.canvasElem = elem}></canvas>
        <ResultComponent rounds={this.props.rounds}/>
      </div>
    )
  }
}

function mapStateToProps({rounds}) {
  return {
    rounds,
  }
}

export default connect(mapStateToProps)(Home)
