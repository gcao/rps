export const INITIALIZE = 'imageClassifier.initialize'
export const CAPTURE = 'imageClassifier.capture'
export const FLAG = 'imageClassifier.flag'
export const UPDATE = 'imageClassifier.update'
export const DESTROY = 'imageClassifier.destroy'

export function initialize(classifier) {
  return { type: INITIALIZE, classifier }
}

export function capture(image) {
  return { type: CAPTURE, image }
}

export function flag(imageClass) {
  return { type: FLAG, imageClass }
}

export function update(payload) {
  return {
    type: UPDATE,
    payload,
  }
}

export function destroy() {
  return { type: DESTROY }
}
