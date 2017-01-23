/*global convnetjs */
declare let convnetjs: any

import Move from '../Move'
import ConvNetPlayer from './ConvNetPlayer'
import IComputerPlayer from './IComputerPlayer'
import DummyPlayer from './DummyPlayer'

export default class MainPlayer implements IComputerPlayer {
  model: MainPlayerModel
  workers: Array<IComputerPlayer>

  constructor(workers?: Array<IComputerPlayer>) {
    this.model = new MainPlayerModel()
    this.workers = workers || [
      new ConvNetPlayer(),
      new DummyPlayer()
    ]
  }

  public predict(input: any): any {
    return this.workers[0].predict(input)
  }

  public train(input: any, move: Move) {
    this.workers[0].train(input, move)
  }
}

class MainPlayerModel {
  net: any
  trainer: any

  constructor() {
    let layerDefs: any = []
    // // input layer (all volumes are 3D)
    // layerDefs.push({ type: 'input', out_sx: 1, out_sy: 1, out_depth: DEPTH })
    // // some fully connected layers
    // layerDefs.push({ type: 'fc', num_neurons: 720, activation: 'sigmoid' })
    // //layerDefs.push({type:'fc', num_neurons:100, activation:'relu'})
    // // a softmax classifier predicting probabilities for three classes: 0,1,2
    // layerDefs.push({ type: 'softmax', num_classes: 3 })

    this.net = new convnetjs.Net()
    this.net.makeLayers(layerDefs)
    this.trainer = new convnetjs.Trainer(this.net, {
      //method: 'adadelta',
      //batch_size: 1,
      l2_decay: 0.0005,
      learning_rate: 0.85,
    })
  }

  public predict(input: any): any {
  }

  public train(input: any, move: Move) {
  }
}