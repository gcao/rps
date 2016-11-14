/*global convnetjs */
export default function ImageClassifier1(options) {
  var layerDefs = []
  // input layer (all volumes are 3D)
  layerDefs.push({type: 'input', out_sx: 320, out_sy: 240, out_depth: 1})
  // some fully connected layers
  layerDefs.push({type: 'fc', num_neurons: 20, activation: 'relu'})
  layerDefs.push({type: 'fc', num_neurons: 20, activation: 'relu'})
  // a softmax classifier predicting probabilities for four classes:  0,1,2,3
  layerDefs.push({type: 'softmax', num_classes: 4})

  this.net = new convnetjs.Net()
  this.net.makeLayers(layerDefs)
  this.trainer = new convnetjs.Trainer(this.net, {
    //method: 'adadelta',
    //batch_size: 1,
    l2_decay: 0.0005,
    learning_rate: 0.0005,
  })
}

