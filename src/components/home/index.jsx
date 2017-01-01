import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import Hidden from '../Hidden'
import Result from '../result'
import Video from '../Video'
import * as actions from './actions'
import { STATE_KEY } from './reducers'
import { registerHandlers, deregisterHandlers } from './handlers'

@connect(state => ({ ...state[STATE_KEY] }))
export default class Home extends Component {

  componentWillMount() {
    registerHandlers()
    this.props.dispatch(actions.initialize())
  }

  componentWillUnmount() {
    deregisterHandlers()
  }

  render() {
    if (!this.props.initialized) {
      return <Hidden/>
    }

    return (
      <div>
        { this.props.started
          ? <div>
              <p>
                <Button primary onClick={() => this.props.dispatch(actions.restart())}>Restart</Button>
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
