/* global RL */
declare let RL: any

import Move from '../Move'
import IComputerPlayer from './IComputerPlayer'

const ACTIONS = 3
const ROUNDS = 6
const DEPTH = ROUNDS * 6

export default class DqnPlayer implements IComputerPlayer {
  agent: any
  myMove: Move

  constructor() {
    let env: any = {}
    env.getNumStates = () => DEPTH
    env.getMaxNumActions = () => ACTIONS

    let spec = {
      update: 'qlearn',  // qlearn | sarsa
      gamma: 0.0,      // discount factor, [0, 1)
      epsilon: 0.15,      // initial epsilon for epsilon-greedy policy, [0, 1)
      alpha: 0.35,      // value function learning rate
      experience_add_every: 1,        // number of time steps before we add another experience to replay memory
      experience_size: 1000,     // size of experience replay memory
      learning_steps_per_iteration: 1,
      tderror_clamp: 1.0,      // for robustness
      num_hidden_units: 120,      // number of neurons in hidden layer
    }

    this.agent = new RL.DQNAgent(env, spec)
  }

  predict(input: any) {
    let myMove = this.agent.act(convert(input))

    return {
      myMove: myMove
    }
  }

  train(input: any, move: Move) {
    let reward = -0.5
    if (this.myMove === (move + 1) % 3) {
      reward = 1
    } else if (move === (this.myMove + 1) % 3) {
      reward = -1
    }
    this.agent.learn(reward)
  }
}

function convert(input: Array<number>) {
  let data = new Array(DEPTH).fill(0)
  let reversedRounds = input.slice().reverse()

  for (let i = 0; i < ROUNDS && i < reversedRounds.length; i++) {
    let round: any = reversedRounds[i]
    let move1 = round[0]
    let move2 = round[1]
    data[round * 6 + move1] = 1
    data[round * 6 + 3 + move2] = 1
  }

  return data
}