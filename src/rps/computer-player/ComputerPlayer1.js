import { findWinningMoveAgainst } from '..';

export default function ComputerPlayer1(options) {
  var ROUNDS = 10;
  var DEPTH = ROUNDS * 6;

  var layer_defs = [];
  // input layer (all volumes are 3D)
  layer_defs.push({type:'input', out_sx:1, out_sy:1, out_depth:DEPTH});
  // some fully connected layers
  layer_defs.push({type:'fc', num_neurons:720, activation:'sigmoid'});
  //layer_defs.push({type:'fc', num_neurons:100, activation:'relu'});
  // a softmax classifier predicting probabilities for three classes: 0,1,2
  layer_defs.push({type:'softmax', num_classes:3});

  this.net = new convnetjs.Net();
  this.net.makeLayers(layer_defs);
  this.trainer = new convnetjs.Trainer(this.net, {
    //method: 'adadelta',
    //batch_size: 1,
    l2_decay: 0.0005,
    learning_rate: 0.85,
  });

  function stateToInput(state) {
    var data = new Array(DEPTH).fill(0);
    var reversedRounds = state.rounds.slice().reverse();

    for (var i=0; i<ROUNDS && i<reversedRounds.length; i++) {
      var round = reversedRounds[i];
      var move1 = round[0], move2 = round[1];
      data[round * 6 + move1] = 1;
      data[round * 6 + 3 + move2] = 1;
    }

    //// Add flags when the opponent's recent two and three rounds throw same thing
    //var extra = [];
    //if (reversedRounds[0] === ROCK && reversedRounds[1] === ROCK) {
    //  extra[0] = 1;
    //  if (reversedRounds[2] === ROCK) {
    //    extra[3] = 1;
    //  }
    //}
    //if (reversedRounds[0] === PAPER && reversedRounds[1] === PAPER) {
    //  extra[1] = 1;
    //  if (reversedRounds[2] === PAPER) {
    //    extra[4] = 1;
    //  }
    //}
    //if (reversedRounds[0] === SCISSORS && reversedRounds[1] === SCISSORS) {
    //  extra[2] = 1;
    //  if (reversedRounds[2] === SCISSORS) {
    //    extra[5] = 1;
    //  }
    //}
    //for (var i=0; i<extra.length; i++) {
    //  data[data.length - extra.length + i] = extra[i];
    //}

    return new convnetjs.Vol(data);
  }

  this.predict = function(state) {
    var prediction = this.net.forward(stateToInput(state));
    var w = prediction.w;

    // TODO if I won last round, play random move on next one because
    // the current model will always play same move!!
    var isRandom = false;
    //if (state.getWinner(0) === 2) {
    //  var r1 = Math.random(), r2 = Math.random(), r3 = Math.random();
    //  var sum = r1 + r2 + r3;
    //  w[0] = r1/sum;
    //  w[1] = r2/sum;
    //  w[2] = r3/sum;
    //  isRandom = true;
    //}

    var move = w.indexOf(Math.max(w[0], w[1], w[2]));
    var winningMove = findWinningMoveAgainst(move);

    return {
      move: move,
      winningMove: winningMove,
      prediction: prediction,
      debug: { // debugging information
        isRandom: isRandom,
      }
    }
  }

  this.train = function(state, move) {
    var result = this.trainer.train(stateToInput(state), move);
    return result;
  }
}
