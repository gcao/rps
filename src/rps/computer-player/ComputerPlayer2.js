/*global RL */
export default function ComputerPlayer2() {
  this.isReinforcementLearning = true

  var ROUNDS = 6
  var DEPTH = ROUNDS * 6

  // create an environment object
  var env = {}
  env.getNumStates = function() { return DEPTH; }
  env.getMaxNumActions = function() { return 3; }

  // create the agent
  var spec = {
    update                       : 'qlearn',  // qlearn | sarsa
    gamma                        : 0.0,      // discount factor, [0, 1)
    epsilon                      : 0.15,      // initial epsilon for epsilon-greedy policy, [0, 1)
    alpha                        : 0.35,      // value function learning rate
    experience_add_every         : 1,        // number of time steps before we add another experience to replay memory
    experience_size              : 1000,     // size of experience replay memory
    learning_steps_per_iteration : 1,
    tderror_clamp                : 1.0,      // for robustness
    num_hidden_units             : 120,      // number of neurons in hidden layer
  }
  var agent = new RL.DQNAgent(env, spec)

  function stateToInput(state) {
    var data = new Array(DEPTH).fill(0)
    var reversedRounds = state.rounds.slice().reverse()

    for (var i=0; i<ROUNDS && i<reversedRounds.length; i++) {
      var round = reversedRounds[i]
      var move1 = round[0], move2 = round[1]
      data[round * 6 + move1] = 1
      data[round * 6 + 3 + move2] = 1
    }

    return data
  }

  var myMove

  this.predict = function(state) {
    myMove = agent.act(stateToInput(state))

    return {
      myMove: myMove
    }
  }

  this.train = function(state, move) {
    var reward = -0.5
    if (myMove === (move + 1)%3) {
      reward = 1
    } else if (move === (myMove + 1)%3) {
      reward = -1
    }
    agent.learn(reward)
  }
}
