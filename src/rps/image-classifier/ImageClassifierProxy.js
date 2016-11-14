/*global convnetjs */
import jQuery from 'jquery'

function imageToVol(imageData) {
  var sx = imageData.length
  var sy = imageData[0].length
  var vol = new convnetjs.Vol(sx, sy, 1)
  for (var i=0; i<sx; i++) {
    for (var j=0; j<sy; j++) {
      vol.set(i, j, 0, imageData[i][j])
    }
  }
  return vol
}

export default function ImageClassifierProxy(modelClass, options) {
  this.model = new modelClass(options)

  this.load = function() {
    var stored = window.localStorage.getItem(modelClass.name)
    if (stored) {
      this.model.net.fromJSON(JSON.parse(stored))
      console.log('The image classifier model is loaded successfully.')
    } else {
      //console.log('No saved image classifier model for ' + modelClass.name + ' is found.')
      var self = this
      var modelUrl = 'models/' + modelClass.name + '.json'
      jQuery.getJSON(modelUrl, function(data) {
        self.model.net.fromJSON(data)
        console.log('The image classifier model is loaded successfully.')
      })
    }
  }

  this.save = function() {
    window.localStorage.setItem(modelClass.name, JSON.stringify(this.model.net.toJSON()))
    console.log('The image classifier model is saved successfully.')
  }

  this.predict = function(image) {
    var prediction = this.model.net.forward(imageToVol(image))
    var w = prediction.w
    var imageClass = w.indexOf(Math.max(w[0], w[1], w[2], w[3]))

    return {
      imageClass: imageClass,
      prediction: prediction,
      debug: {
        // TODO debugging information
      }
    }
  }

  this.train = function(image, imageClass) {
    this.model.trainer.train(imageToVol(image), imageClass)
  }
}
