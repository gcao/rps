import React, { Component } from 'react'

const WIDTH  = 320
const HEIGHT = 240

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
      this.video.src = window.URL.createObjectURL(stream)
    }, function(e) {
      console.log('Access to camera is rejected!', e)
    })
  }

  //componentWillReceiveProps(newProps) {
  //  if (!newProps.paused && this.video.paused) {
  //    this.video.play()
  //  } else if (newProps.paused && !this.video.paused) {
  //    this.video.pause()
  //  }
  //}

  capture() {
    let data = null

    let ctx = this.canvas.getContext('2d')
    ctx.drawImage(this.video, 0, 0)

    let imagePixels = ctx.getImageData(0, 0, WIDTH, HEIGHT)
    data = []
    for (var i=0; i<WIDTH; i++) {
      data[i] = []
      for (var j=0; j<HEIGHT; j++) {
        var pixelIndex = (i * 4) * HEIGHT + j * 4
        // http://www.ajaxblender.com/howto-convert-image-to-grayscale-using-javascript.html
        var grayScale = (imagePixels.data[pixelIndex] + imagePixels.data[pixelIndex + 1] + imagePixels.data[pixelIndex + 2])/3
        data[i].push(grayScale)
      }
    }

    return data
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
          ref={ (el) => this.canvas = el }
        />
      </span>
    )
  }
}
