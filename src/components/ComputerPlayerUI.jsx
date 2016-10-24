import jQuery from 'jquery';
import key from 'keymaster';
import React, { Component } from 'react';
import { observer } from 'mobx-react';

import {
  ROCK, PAPER, SCISSORS,
  findWinningMoveAgainst,
  computeResult,
  showRound,
  toPercentage,
} from '../rps';
import GameState  from '../rps/GameState';
import { ComputerPlayerProxy, DefaultComputerPlayer } from '../rps/computer-player';

@observer
class ComputerPlayerUI extends Component {
  constructor(props) {
    super(props);

    key('f, j', () => this.flag(ROCK));
    key('d, k', () => this.flag(PAPER));
    key('s, l', () => this.flag(SCISSORS));
  }

  flag(move) {
    var computerPlayer = new ComputerPlayerProxy(DefaultComputerPlayer);
    var gameState = new GameState();

    var before = computerPlayer.predict(gameState);
    var w = before.prediction.w;
    jQuery('.rock     .before-training').text(w[0].toFixed(4));
    jQuery('.paper    .before-training').text(w[1].toFixed(4));
    jQuery('.scissors .before-training').text(w[2].toFixed(4));

    var computerMove = before.winningMove;
    var result = computeResult(move, computerMove);
    showRound(move, computerMove, result);

    computerPlayer.train(gameState, move);
    var after = computerPlayer.predict(gameState);
    w = after.prediction.w
    jQuery('.rock     .after-training').text(w[0].toFixed(4));
    jQuery('.paper    .after-training').text(w[1].toFixed(4));
    jQuery('.scissors .after-training').text(w[2].toFixed(4));

    // Add current round to game state
    gameState.rounds.push([move, computerMove]);

    jQuery('#total-games').text(gameState.rounds.length);
    jQuery('#player1-winning').text(toPercentage(gameState.getPlayer1WinningRate()));
    if (gameState.rounds.length >= 10) {
      jQuery('.stats .recent-10').show();
      jQuery('#player1-winning-10').text(toPercentage(gameState.getPlayer1WinningRate(10)));
    }
  }

  render() {
    return (
      <div>
        <h1>Train the AI player</h1>
        <div className='ready'>
          <div className="rock action-container">
            <span className="before-training"></span><br/>
            <button id='rock' onClick={() => this.flag(ROCK)}>Rock (F/J)</button><br/>
            <span className="after-training"></span>
          </div>
          <div className="paper action-container">
            <span className="before-training"></span><br/>
            <button id='paper' onClick={() => this.flag(PAPER)}>Paper (D/K)</button><br/>
            <span className="after-training"></span>
          </div>
          <div className="scissors action-container">
            <span className="before-training"></span><br/>
            <button id='scissors' onClick={() => this.flag(SCISSORS)}>Scissors (S/L)</button><br/>
            <span className="after-training"></span>
          </div>
        </div>
        <div className='stats'>
          <h3>
            Games: <span id="total-games">0</span>
          </h3>
          <div className="all">
            Player 1 (Human) winning rate:
            <span id="player1-winning"></span>
          </div>

          <div className="recent-10">
            Player 1 Winning rate (last 10 rounds):
            <span id="player1-winning-10"></span>
          </div>
        </div>
        <div className='results'></div>
      </div>
    );
  }
};

export default ComputerPlayerUI;
