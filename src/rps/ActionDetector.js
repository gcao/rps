import { UNKNOWN } from '.'
import { ImageClassifierProxy, DefaultImageClassifier } from './image-classifier'

let IMAGE_SIMILARITY_THRESHOLD     = 0.010
let MOVEMENT_THRESHOLD             = 0.03
let ACTIONABLE_SIMILAR_IMAGE_COUNT = 5

export default class ActionDetector {
  constructor() {
    this.imageClassifier = new ImageClassifierProxy(DefaultImageClassifier)
    this.imageClassifier.load()

    this.reset()
  }

  reset() {
    this.similarities    = []
    this.rememberedImage = null
  }

  detect(newImage) {
    let result = {detected: false}

    let oldImage = this.rememberedImage
    this.rememberedImage = newImage

    if (!oldImage) {
      return result
    }

    let similarity = compare(oldImage, newImage)
    this.similarities.unshift(similarity)
    // Remove extra items
    while (this.similarities.length > 10) {
      this.similarities.pop()
    }

    if (this.similarities.length < 10) {
      return result
    }

    if (this._checkAction()) {
      let imageClass = this.imageClassifier.predict(newImage).imageClass
      if (imageClass !== UNKNOWN) {
        result.detected = true
        result.imageClass = imageClass
        this.reset()
      }
    }

    return result
  }

  _checkAction() {
    for (var i=0; i<ACTIONABLE_SIMILAR_IMAGE_COUNT; i++) {
      if (this.similarities[i] >= IMAGE_SIMILARITY_THRESHOLD) {
        return false
      }
    }

    // A frame change represents similarity between two consequent images is greater than some threshold
    var frameChanges = 0
    for (var j=4; j<10; j++) {
      if (this.similarities[i] >= MOVEMENT_THRESHOLD) {
        frameChanges += 1
      }
    }

    return frameChanges >= 3
  }
}

/**
 * return difference
 */
function compare(image1, image2) {
  var sum = 0

  for (var i=0; i<320; i++) {
    for (var j=0; j<240; j++) {
      sum += image2[i][j] - image1[i][j]
    }
  }

  return Math.abs(sum / (320*240 * 256))
}
