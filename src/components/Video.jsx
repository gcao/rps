import React, { Component } from 'react'
import { WIDTH, HEIGHT } from '../common'

const CONSTRAINTS = {
  video: {
    mandatory: {
      maxWidth: WIDTH,
      maxHeight: HEIGHT,
    }
  }
}

export default class Video extends Component {
  componentDidMount() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia

    navigator.getUserMedia(CONSTRAINTS, (stream) => {
      if (this.video) {
        this.video.srcObject = stream
      }
    }, function(e) {
      console.log('Access to camera is rejected!', e)
    })
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.paused && this.video.paused) {
      this.video.play()
    } else if (newProps.paused && !this.video.paused) {
      this.video.pause()
    }
  }

  render() {
    return (
      <span>
        <video autoPlay
          style={{ display: this.props.showCaptured ? 'none' : '' }}
          ref={ (el) => this.video = el }
        />
        <canvas width={ WIDTH } height={ HEIGHT }
          style={{ display: this.props.showCaptured ? '' : 'none' }}
        />
      </span>
    )
  }
}
