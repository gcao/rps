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

export function initialize(options) {
  videoElem = options.videoElem
  canvasElem = options.canvasElem

  return function(dispatch) {
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

    function start() {
      videoElem.play()
      timeoutRef = setTimeout(timeoutCallback, ACTION_DETECTION_INTERVAL)
    }

    function stop() {
      videoElem.pause()
      clearTimeout(timeoutRef)
    }

    function timeoutCallback() {
      timeoutRef = setTimeout(timeoutCallback, ACTION_DETECTION_INTERVAL)

      var imageData = capture()
      if (!imageData) {
        return
      }

      var action = actionDetector.detect(imageData)
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

    dispatch({ type: INITIALIZE })

    timeoutRef = setTimeout(timeoutCallback, ACTION_DETECTION_INTERVAL)
  }
}

export function destroy() {
  return { type: DESTROY }
}

