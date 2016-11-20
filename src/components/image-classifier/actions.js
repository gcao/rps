export const INITIALIZE = 'imageClassifier.initialize'
export const CAPTURE = 'imageClassifier.capture'
export const FLAG = 'imageClassifier.flag'

export function initialize(classifier) {
  return {
    type: INITIALIZE,
    classifier,
  }
}

export function capture(image) {
  return { type: CAPTURE, image }
}

export function flag(imageClass) {
  return { type: FLAG, imageClass }
}
