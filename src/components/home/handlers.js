import capture from '../../common/capture'
import { addHandler } from '../../handlers'
import { START, detect } from './actions'

const ACTION_DETECTION_INTERVAL = 150

export let start = (action, {store}) => {
  if (action.type !== START) {
    return
  }

  startTimer(action, store)
}
addHandler(start)

let startTimer = (action, store) => {
  setTimeout(() => {
    let video = document.querySelector('video')
    let canvas = document.querySelector('canvas')
    let image = capture(video, canvas)
    store.dispatch(detect(image))
  }, ACTION_DETECTION_INTERVAL)
}
