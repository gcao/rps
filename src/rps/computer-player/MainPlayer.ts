/*global convnetjs */
declare let convnetjs: any

// import * as R from 'ramda'
import Move from '../Move'
import ConvNetPlayer from './ConvNetPlayer'
import IComputerPlayer from './IComputerPlayer'
import DummyPlayer from './DummyPlayer'
import Prediction from './Prediction'
import GameState from '../GameState'

const NO_OF_CHILDREN = 2
const MAIN_PLAYER_ROUNDS = 10
const DEPTH = 1 + NO_OF_CHILDREN * 3 + MAIN_PLAYER_ROUNDS * 7

export default class MainPlayer implements IComputerPlayer {
  model: MainPlayerModel
  workers: Array<IComputerPlayer>
  cachedResults: Array<Prediction>

  constructor(workers?: Array<IComputerPlayer>) {
    this.workers = workers || [
      new ConvNetPlayer(),
      new DummyPlayer(),
    ]
    this.model = new MainPlayerModel(this.workers.length)
  }

  public predict(input: any): any {
    let results = this.workers.map(worker => worker.predict(input))
    this.cachedResults = results

    let mainModelInput = new MainPlayerModelInput(input as GameState, results)
    return this.model.predict(mainModelInput)
  }

  public train(input: any, move: Move) {
    this.workers.forEach(worker => worker.train(input, move))

    let mainModelInput = new MainPlayerModelInput(input as GameState, this.cachedResults)
    this.model.train(mainModelInput, move)
  }

  // findBest(predictions: Array<Prediction>): Prediction {
  //   return R.sort(prediction => prediction.maxProbability, predictions)[0]
  // }
}

class MainPlayerModel {
  net: any
  trainer: any

  constructor(noOfChildren: number) {
    let layerDefs: any = []
    // input layer (all volumes are 3D)
    layerDefs.push({ type: 'input', out_sx: 1, out_sy: 1, out_depth: DEPTH })
    // some fully connected layers
    layerDefs.push({ type: 'fc', num_neurons: 720, activation: 'sigmoid' })
    //layerDefs.push({type:'fc', num_neurons:100, activation:'relu'})
    // a softmax classifier predicting probabilities for three classes: 0,1,2
    layerDefs.push({ type: 'softmax', num_classes: 3 })

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
    let prediction = this.net.forward(input.toVol())
    return new Prediction(prediction.w)
  }

  public train(input: any, move: Move) {
    this.trainer.train(input.toVol(), move)
  }
}

class MainPlayerModelInput {
  winning: boolean
  childrenOutput: Array<Prediction>
  gameState: GameState

  constructor(gameState: GameState, childrenOutput: Array<Prediction>) {
    this.winning = gameState.getPlayer1WinningRate() > 0.5
    this.childrenOutput = childrenOutput
    this.gameState = gameState
  }

  toVol() {
    let data = new Array(DEPTH).fill(0)
    let index = 0
    data[index++] = this.winning

    this.childrenOutput.forEach((output, i) => {
      data[index++] = output.probabilities[0]
      data[index++] = output.probabilities[1]
      data[index++] = output.probabilities[2]
    })

    for (let i = 0; i < MAIN_PLAYER_ROUNDS; i++) {
      let round = this.gameState.getReversedRound(i)
      data[index + round.player1Move]
      index += 3
      data[index + round.player2Move]
      index += 3
      data[index++] = round.result
    }

    return new convnetjs.Vol(data)
  }
}