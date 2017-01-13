/*global convnetjs */

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

const LAYER_TYPES = {
  conv: 'Convolutional Layer',
  relu: 'ReLU Layer',
  pool: 'Pool Layer',
}

function getDescriptiveLayerType(type) {
  return LAYER_TYPES[type] || type
}

export default function ImageClassifierProxy(implementation, options) {
  this.implementation = implementation
  this.model = new implementation(options)

  this.fromJSON = function(json) {
    this.model.net.fromJSON(json)
  }

  this.toJSON = function() {
    return this.model.net.toJSON()
  }

  this.predict = function(image) {
    var prediction = this.model.net.forward(imageToVol(image))
    var w = prediction.w
    var imageClass = w.indexOf(Math.max(w[0], w[1], w[2], w[3]))

    let debug = {
      layers: []
    }
    this.model.net.layers.forEach(layer => {
      debug.layers.push({
        type: getDescriptiveLayerType(layer.layer_type),
        data: layer.out_act,
      })
    })

    return {
      imageClass: imageClass,
      prediction: prediction,
      debug,
    }
  }

  this.train = function(image, imageClass) {
    this.model.trainer.train(imageToVol(image), imageClass)
  }
}
