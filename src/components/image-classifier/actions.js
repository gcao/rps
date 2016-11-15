export const INITIALIZE = 'imageClassifier.initialize'
export const CAPTURE = 'imageClassifier.capture'

export function initialize() {
  return { type: INITIALIZE }
}

export function capture(image) {
  return { type: CAPTURE, image: image }
}

