export default function ImageClassifier2(options) {
  var layer_defs = [];
  // input layer (all volumes are 3D)
  layer_defs.push({type:'input', out_sx:320, out_sy:240, out_depth:1});
  // output of below layer will be 160x120x8
  layer_defs.push({type:'conv', sx:5, filters:8, stride:2, pad:2, activation:'relu'});
  // output of below layer will be 80x60x8
  layer_defs.push({type:'pool', sx:2, stride:2});
  // output of below layer will be 40x30x8
  layer_defs.push({type:'conv', sx:5, filters:8, stride:2, pad:2, activation:'relu'});
  // output of below layer will be 20x15x8
  layer_defs.push({type:'pool', sx:2, stride:2});
  // a softmax classifier predicting probabilities for four classes: 0,1,2,3
  layer_defs.push({type:'softmax', num_classes:4});

  this.net = new convnetjs.Net();
  this.net.makeLayers(layer_defs);
  this.trainer = new convnetjs.Trainer(this.net, {
    method: 'adadelta',
    batch_size: 1,
    l2_decay:0.0007,
    learning_rate: 0.0005,
  });
}
