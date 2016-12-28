import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import Result from '../result'
import Video from '../Video'
import * as actions from './actions'
import './reducers'
import './handlers'

function mapStateToProps({rounds, home, video}) {
  return {
    rounds,
    videoPaused: video && video.paused,
    ...home
  }
}

@connect(mapStateToProps)
export default class Home extends Component {
  render() {
    return (
      <div>
        { this.props.started
          ? <div>
            <p>
              <Button primary onClick={() => this.props.dipatch(actions.restart())}>Restart</Button>
              { !this.props.videoPaused &&
                <Button primary onClick={() => this.props.dispatch(actions.pause())}>Pause</Button>
              }
              { this.props.videoPaused &&
                <Button primary onClick={() => this.props.dispatch(actions.resume())}>Resume</Button>
              }
              <Button primary onClick={() => this.props.dispatch(actions.stop())}>Stop</Button>
            </p>
            <p>
              <Video paused={this.props.videoPaused}/>
            </p>
            <div id="training-container" style={{ display:'none' }}>
              <p>
                <img id='captured' src=""/>
              </p>
              <p id='not-recognized' style={{ display:'none' }}>Not recognized!</p>
            </div>
            <Result rounds={this.props.rounds}/>
          </div>
        : <p>
            <Button primary onClick={() => this.props.dispatch(actions.start())}>Play!</Button>
          </p>
        }
      </div>
    )
  }
}
