import ComputerPlayer1 from './ComputerPlayer1';

export function ComputerPlayerProxy(playerClass, options) {
  this.player = new playerClass(options);

  this.predict = function(state) {
    return this.player.predict(state);
  }

  this.train = function(state, move) {
    return this.player.train(state, move);
  }
}

// TODO create multiple models and train at the same time
// Model interface:
//   Methods:
//     predict(state): return a json object with prediction etc
//     train(state, move):

export var DefaultComputerPlayer = ComputerPlayer1;
