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
    if (!newProps.paused && this.elem.paused) {
      this.elem.play()
    } else if (newProps.paused && !this.elem.paused) {
      this.elem.pause()
    }
  }

  setVideoElem = (elem) => {
    this.elem = elem
    this.props.setVideoElem && this.props.setVideoElem(elem)
  }

  render() {
    return <video autoPlay ref={this.setVideoElem}/>
  }
}
