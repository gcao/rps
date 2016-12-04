import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
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

  start() {
    this.props.dispatch(actions.start({
      videoElem: this.videoElem,
      canvasElem: this.canvasElem,
    }))
  }

  restart() {
    this.props.dispatch(actions.stop())
    this.props.dispatch(actions.start())
  }

  pause() {
    this.props.dispatch(actions.pause())
  }

  resume() {
    this.props.dispatch(actions.resume())
  }

  componentWillUnmount() {
    this.props.dispatch(removeReducer(reducers))
    this.props.dispatch(actions.destroy())
  }

  render() {
    return (
      <div>
        { this.props.started
          ? <div>
            <p>
              <Button primary onClick={() => this.restart()}>Restart</Button>
              <Button primary onClick={() => this.pause()}>Pause</Button>
              { this.props.paused &&
                <Button primary onClick={() => this.resume()}>Resume</Button>
              }
              <Button primary onClick={() => this.stop()}>Stop</Button>
            </p>
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
        : <p>
            <Button primary onClick={() => this.start()}>Play!</Button>
          </p>
        }
      </div>
    )
  }
}

function mapStateToProps({rounds, home}) {
  return {
    rounds,
    ...home
  }
}

export default connect(mapStateToProps)(Home)
