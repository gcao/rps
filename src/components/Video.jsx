import React, { Component } from 'react'

const CONSTRAINTS = {
  video: {
    mandatory: {
      maxWidth: 320,
      maxHeight: 240,
    }
  }
}

export default class Video extends Component {
  componentDidMount() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia

    navigator.getUserMedia(CONSTRAINTS, (stream) => {
      this.elem.src = window.URL.createObjectURL(stream)
    }, function(e) {
      console.log('Access to camera is rejected!', e)
    })
  }

  componentWillReceiveProps(newProps) {
    if (this.props.status === 'running' && this.elem.paused) {
      this.elem.play()
    } else if (this.props.status === 'paused' && !this.elem.paused) {
      this.elem.pause()
    }
  }

  render() {
    return <video ref={(el => this.elem = el)}{...this.props}/>
  }
}
