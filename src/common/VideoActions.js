const CONSTRAINTS = {
  video: {
    mandatory: {
      maxWidth: 320,
      maxHeight: 240,
    }
  }
}

export default class VideoActions {
  constructor(videoElem, canvasElem) {
    this.videoElem = videoElem
    this.canvasElem = canvasElem

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia

    navigator.getUserMedia(CONSTRAINTS, (stream) => {
      this.videoElem.src = window.URL.createObjectURL(stream)
    }, function(e) {
      console.log('Access to camera is rejected!', e)
    })
  }

  capture() {
    var data = null

    var ctx = this.canvasElem.getContext('2d')
    ctx.drawImage(this.videoElem, 0, 0)

    var imagePixels = ctx.getImageData(0, 0, 320, 240)
    data = []
    for (var i=0; i<320; i++) {
      data[i] = []
      for (var j=0; j<240; j++) {
        var pixelIndex = (i * 4) * 240 + j * 4
        // http://www.ajaxblender.com/howto-convert-image-to-grayscale-using-javascript.html
        var grayScale = (imagePixels.data[pixelIndex] + imagePixels.data[pixelIndex + 1] + imagePixels.data[pixelIndex + 2])/3
        data[i].push(grayScale)
      }
    }

    //this.canvasElem.putImageData(new window.ImageData(Uint8ClampedArray.from(data)))
    return data
  }

  pause() {
    this.videoElem.pause()
  }

  resume() {
    this.videoElem.play()
  }
}
