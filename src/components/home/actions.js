const ACTION_DETECTION_INTERVAL = 150
const CONSTRAINTS = {
  video: {
    mandatory: {
      maxWidth: 320,
      maxHeight: 240,
    }
  }
}

export const INITIALIZE = 'home.initialize'
export const START      = 'home.start'
export const STOP       = 'home.stop'
export const DESTROY    = 'home.destroy'

import GameState from '../../rps/GameState'
import ActionDetector from '../../rps/ActionDetector'
import { ComputerPlayerProxy, DefaultComputerPlayer } from '../../rps/computer-player'

let actionDetector
let computerPlayer
let gameState

let videoElem
let canvasElem
var localMediaStream
var timeoutRef

export function initialize() {
}

export function start(options) {
  return dispatch => {
    videoElem = options.videoElem
    canvasElem = options.canvasElem

    gameState = new GameState()
    actionDetector = new ActionDetector()
    computerPlayer = new ComputerPlayerProxy(DefaultComputerPlayer)

    navigator.getUserMedia =
      navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia

    navigator.getUserMedia(CONSTRAINTS, function(stream) {
      videoElem.src = window.URL.createObjectURL(stream)
    }, function(e) {
      console.log('Access to camera is rejected!', e)
    })

    dispatch({ type: START })
    captureAndDetect(dispatch)
  }
}

// TODO
export function pause() {
}

export function resume() {
}

export function stop() {
  videoElem.pause()
  clearTimeout(timeoutRef)
  return { type: STOP }
}

function captureAndDetect(dispatch) {
  timeoutRef = setTimeout(function() {
    let image = capture()
    detect(dispatch, image)
  }, ACTION_DETECTION_INTERVAL)
}

function capture() {
  var data = null

  if (localMediaStream) {
    var ctx = canvasElem.getContext('2d')
    ctx.drawImage(videoElem, 0, 0)
    // canvas.style.display = ""

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
  }

  return data
}

function detect(dispatch, image) {
  var action = actionDetector.detect(image)
  if (action.detected) {
    stop()

    // let the AI predict and play, then train with the real human move, add to game state

    var prediction = computerPlayer.predict(gameState)

    var humanMove = action.imageClass
    var computerMove = prediction.myMove

    computerPlayer.train(gameState, humanMove)

    gameState.rounds.push([humanMove, computerMove])

    // TODO update game display
    start()
  }
}

export function destroy() {
  return { type: DESTROY }
}

