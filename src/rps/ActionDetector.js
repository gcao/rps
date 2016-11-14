var ACTION_DETECTION_INTERVAL = 150
var IMAGE_SIMILARITY_THRESHOLD = 0.010
var MOVEMENT_THRESHOLD = 0.03
var ACTIONABLE_SIMILAR_IMAGE_COUNT = 5

var logMovement   = location.toString().indexOf('logMovement') >= 0
var debugMovement = location.toString().indexOf('debugMovement') >= 0

export function ActionDetector() {

  this.imageClassifier = new ImageClassifier(DefaultImageClassifierModel)
  this.imageClassifier.load()

  this.reset = function() {
    this.similarities = []
    this.rememberedImage = null
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

  this.detect = function(newImage) {
    var result = {detected: false}

    var oldImage = this.rememberedImage
    this.rememberedImage = newImage

    if (!oldImage) {
      return result
    }

    var similarity = compare(oldImage, newImage)
    this.similarities.unshift(similarity)
    // Remove extra items
    while (this.similarities.length > 10) {
      this.similarities.pop()
    }

    if (this.similarities.length < 10) {
      return result
    }

    if (window.logMovement) {
      console.log('ActionDetector.detect()')
      console.log(this.similarities)
    }

    if (this._checkAction()) {
      //if (window.debugMovement) debugger
      var imageClass = this.imageClassifier.predict(newImage).imageClass
      if (imageClass !== UNKNOWN) {
        if (window.debugMovement) debugger
        result.detected = true
        result.imageClass = imageClass
        this.reset()
      }
    }

    return result
  }

  this._checkAction = function() {
    for (var i=0; i<ACTIONABLE_SIMILAR_IMAGE_COUNT; i++) {
      if (this.similarities[i] >= IMAGE_SIMILARITY_THRESHOLD) {
        return false
      }
    }

    // A frame change represents similarity between two consequent images is greater than some threshold
    var frameChanges = 0
    for (var i=4; i<10; i++) {
      if (this.similarities[i] >= MOVEMENT_THRESHOLD) {
        frameChanges += 1
      }
    }

    return frameChanges >= 3
  }

  this.reset()
}

