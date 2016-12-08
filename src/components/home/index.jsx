import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

import ResultComponent from '../result'

import { addReducer, removeReducer } from '../../reducers'
import reducers from './reducers'
import { HomeActions } from './actions'

class Home extends Component {
  constructor(props) {
    super(props)

    this.props.dispatch(addReducer(reducers))
    this.actions = new HomeActions(this)
  }

  componentWillUnmount() {
    this.props.dispatch(removeReducer(reducers))
  }

  render() {
    let actions = this.actions
    return (
      <div>
        { this.props.started
          ? <div>
            <p>
              <Button primary onClick={() => actions.restart()}>Restart</Button>
              <Button primary onClick={() => actions.pause()}>Pause</Button>
              { this.props.paused &&
                <Button primary onClick={() => actions.resume()}>Resume</Button>
              }
              <Button primary onClick={() => actions.stop()}>Stop</Button>
            </p>
            <p>
              <video autoPlay ref={elem => actions.videoElem = elem}/>
            </p>
            <div id="training-container" style={{ display:'none' }}>
              <p>
                <img id='captured' src=""/>
              </p>
              <p id='not-recognized' style={{ display:'none' }}>Not recognized!</p>
            </div>
            <canvas style={{ display:'none' }} width="320px" height="240px" ref={elem => actions.canvasElem = elem}></canvas>
            <ResultComponent rounds={this.props.rounds}/>
          </div>
        : <p>
            <Button primary onClick={() => actions.start()}>Play!</Button>
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
