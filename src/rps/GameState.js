export default function GameState() {
  this.rounds = [];

  this.reset = function() {
    this.rounds = [];
  }

  this.getWinner = function(round) {
    if (round >= this.rounds.length) {
      return 0;
    }

    var moves = this.rounds[round];
    if (moves[0] === moves[1]) {
      return 0;
    } else if (moves[0] === (moves[1] + 1)%3) {
      return 1;
    } else {
      return 2;
    }
  }

  this.getPlayer1WinningRate = function(n) {
    if (this.rounds.length === 0) {
      return 0.5;
    }

    var player1Score = 0;
    var totalScore = 0;

    if (!n || n <= 0 || n > this.rounds.length) {
      n = this.rounds.length;
    }

    for (var i=this.rounds.length - n; i<this.rounds.length; i++) {
      totalScore += 2;
      var winner = this.getWinner(i);
      if (winner === 1) {
        player1Score += 2;
      } else if (winner === 0) {
        player1Score += 1;
      }
    }

    return player1Score / totalScore;
  }

  this.getPlayer2WinningRate = function(n) {
    return 1 - this.getPlayer1WinningRate(n);
  }
}

