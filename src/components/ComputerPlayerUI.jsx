import jQuery from 'jquery';
import key from 'keymaster';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  ROCK, PAPER, SCISSORS,
  findWinningMoveAgainst,
  computeResult,
  //showRound,
  toPercentage,
} from '../rps';
import GameState  from '../rps/GameState';
import { ComputerPlayerProxy, DefaultComputerPlayer } from '../rps/computer-player';

class ComputerPlayerUI extends Component {
  constructor(props) {
    super(props);

    this.computerPlayer = new ComputerPlayerProxy(DefaultComputerPlayer);
    this.gameState = new GameState();

    key('f, j', () => this.flag(ROCK));
    key('d, k', () => this.flag(PAPER));
    key('s, l', () => this.flag(SCISSORS));
  }

  //function showRound(player1Move, player2Move, result) {
  //  var resultClass = '';
  //  switch (result) {
  //    case 0:
  //      resultClass = 'draw';
  //      break;
  //    case 1:
  //      resultClass = 'player1';
  //      break;
  //    case 2:
  //      resultClass = 'player2';
  //      break;
  //  }

  //  jQuery('.results').prepend('<div class="round ' + resultClass + '" style="display:none;"><div class="player1 ' + translateMove(player1Move) + '"></div><div class="vs"></div><div class="player2 ' + translateMove(player2Move) + '"></div></div>');
  //  jQuery('.results > :first-child').slideDown(600, 'swing');
  //}

  flag(move) {
    this.before = this.computerPlayer.predict(this.gameState);
    //var w = this.before.prediction.w;
    //jQuery('.rock     .before-training').text(w[0].toFixed(4));
    //jQuery('.paper    .before-training').text(w[1].toFixed(4));
    //jQuery('.scissors .before-training').text(w[2].toFixed(4));

    var computerMove = this.before.winningMove;
    var result = computeResult(move, computerMove);
    //showRound(move, computerMove, result);

    this.computerPlayer.train(this.gameState, move);
    this.after = this.computerPlayer.predict(this.gameState);
    //w = after.prediction.w
    //jQuery('.rock     .after-training').text(w[0].toFixed(4));
    //jQuery('.paper    .after-training').text(w[1].toFixed(4));
    //jQuery('.scissors .after-training').text(w[2].toFixed(4));

    // Add current round to game state
    this.gameState.rounds.push([move, computerMove]);

    //jQuery('#total-games').text(this.gameState.rounds.length);
    //jQuery('#player1-winning').text(toPercentage(this.gameState.getPlayer1WinningRate()));
    //if (this.gameState.rounds.length >= 10) {
    //  jQuery('.stats .recent-10').show();
    //  jQuery('#player1-winning-10').text(toPercentage(this.gameState.getPlayer1WinningRate(10)));
    //}
  }

  render() {
    var reversedRounds = this.gameState.rounds.slice().reverse();

    return (
      <div>
        <h1>Train the AI player</h1>
        <div className='ready'>
          <div className="rock action-container">
            {
              this.before && this.before.prediction &&
              <span className="before-training">
                {this.before.prediction.w[0].toFixed(4)}
                <br/>
              </span>
            }
            <button id='rock' onClick={() => this.flag(ROCK)}>Rock (F/J)</button>
            {
              this.before && this.before.prediction &&
              <span className="after-training">
                {this.after.prediction.w[0].toFixed(4)}
                <br/>
                <br/>
              </span>
            }
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
            Games: <span id="total-games">{this.gameState.rounds.length}</span>
          </h3>
          <div className="all">
            Player 1 (Human) winning rate:
            <span id="player1-winning">{toPercentage(this.gameState.getPlayer1WinningRate())}</span>
          </div>
          { this.gameState.rounds.length >= 10 &&
            <div className="recent-10">
              Player 1 Winning rate (last 10 rounds):
              <span id="player1-winning-10">{toPercentage(this.gameState.getPlayer1WinningRate(10))}</span>
            </div>
          }
        </div>
        <div className='results'>
          {
            reversedRounds.forEach(function(item) {
              var player1Class = `player1 ${translateMove(player1Move)}`;
              var player2Class = `player2 ${translateMove(player2Move)}`;
              var resultClass = 'round ';
              switch (result) {
                case 0:
                  resultClass += 'draw';
                  break;
                case 1:
                  resultClass += 'player1';
                  break;
                case 2:
                  resultClass += 'player2';
                  break;
              }

              return (
                <div className={resultClass}>
                  <div className={player1Class}></div>
                  <div className="vs"></div>
                  <div className={player2Class}></div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
};

export default connect()(ComputerPlayerUI);

