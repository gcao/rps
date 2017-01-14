/*global convnetjs */
declare let convnetjs: any

import { findWinningMoveAgainst } from '..'
import ComputerPlayer from './ComputerPlayer'
import Move from '../Move'
import GameState from '../GameState'
import Round from '../Round'

const ROUNDS = 10
const DEPTH = ROUNDS * 6

export default class ConvNetPlayer implements ComputerPlayer {
  net: any
  trainer: any

  input: GameState

  constructor() {
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
    this.input = input
    let prediction = this.net.forward(convert(input))
    let w = prediction.w

    // TODO if I won last round, play random move on next one because
    // the current model will always play same move!!
    let isRandom = false
    //if (state.getWinner(0) === 2) {
    //  var r1 = Math.random(), r2 = Math.random(), r3 = Math.random()
    //  var sum = r1 + r2 + r3
    //  w[0] = r1/sum
    //  w[1] = r2/sum
    //  w[2] = r3/sum
    //  isRandom = true
    //}

    let move = w.indexOf(Math.max(w[0], w[1], w[2]))
    let winningMove = findWinningMoveAgainst(move)

    return {
      move: move,
      winningMove: winningMove,
      prediction: prediction,
      debug: { // debugging information
        isRandom: isRandom,
      }
    }
  }

  public train(move: Move): any {
    let result = this.trainer.train(convert(this.input), move)
    return result
  }
}

function convert(input: any): any {
  let rounds: Array<Round> = input.rounds
  let data = new Array(DEPTH).fill(0)
  let reversedRounds = rounds.slice().reverse()

  for (let i = 0; i < ROUNDS && i < reversedRounds.length; i++) {
    let round: Round = reversedRounds[i]
    let move1: Move = round.player1Move
    let move2: Move = round.player2Move
    data[i * 6 + move1] = 1
    data[i * 6 + 3 + move2] = 1
  }

  //// Add flags when the opponent's recent two and three rounds throw same thing
  //var extra = []
  //if (reversedRounds[0] === ROCK && reversedRounds[1] === ROCK) {
  //  extra[0] = 1
  //  if (reversedRounds[2] === ROCK) {
  //    extra[3] = 1
  //  }
  //}
  //if (reversedRounds[0] === PAPER && reversedRounds[1] === PAPER) {
  //  extra[1] = 1
  //  if (reversedRounds[2] === PAPER) {
  //    extra[4] = 1
  //  }
  //}
  //if (reversedRounds[0] === SCISSORS && reversedRounds[1] === SCISSORS) {
  //  extra[2] = 1
  //  if (reversedRounds[2] === SCISSORS) {
  //    extra[5] = 1
  //  }
  //}
  //for (var i=0; i<extra.length; i++) {
  //  data[data.length - extra.length + i] = extra[i]
  //}

  return new convnetjs.Vol(data)
}