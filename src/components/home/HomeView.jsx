import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

import Result from '../result'
import Video from '../Video'

class HomeView extends Component {
  render() {
    return (
      <div>
        { this.props.started
          ? <div>
            <p>
              <Button primary onClick={() => this.props.restart()}>Restart</Button>
              <Button primary onClick={() => this.props.pause()}>Pause</Button>
              { this.props.paused &&
                <Button primary onClick={() => this.props.resume()}>Resume</Button>
              }
              <Button primary onClick={() => this.props.stop()}>Stop</Button>
            </p>
            <p>
              <Video autoPlay ref={elem => this.props.setVideoElem(elem)}/>
            </p>
            <div id="training-container" style={{ display:'none' }}>
              <p>
                <img id='captured' src=""/>
              </p>
              <p id='not-recognized' style={{ display:'none' }}>Not recognized!</p>
            </div>
            <canvas style={{ display:'none' }} width="320px" height="240px" ref={elem => this.props.setCanvasElem(elem)}></canvas>
            <Result rounds={this.props.rounds}/>
          </div>
        : <p>
            <Button primary onClick={() => this.props.start()}>Play!</Button>
          </p>
        }
      </div>
    )
  }
}

export default HomeView
