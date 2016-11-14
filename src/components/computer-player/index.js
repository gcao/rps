import key from 'keymaster'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { defaultReducers } from '../../reducers'

import {
  ROCK, PAPER, SCISSORS,
  findWinningMoveAgainst,
  computeResult,
  toPercentage,
} from '../../rps'
import GameState  from '../../rps/GameState'
import { ComputerPlayerProxy, DefaultComputerPlayer } from '../../rps/computer-player'

import reducers from './reducers'
import { play, initialize } from './actions'
export { initialize as initializeComputerPlayer }

class ComputerPlayerComponent extends Component {
  constructor(props) {
    super(props)

    defaultReducers.add(reducers)

    key('f, j', () => this.play(ROCK))
    key('d, k', () => this.play(PAPER))
    key('s, l', () => this.play(SCISSORS))

    this.gameState = new GameState(this.props.rounds)
  }

  play(move) {
    this.props.dispatch(play(move))
  }

  componentWillUnmount() {
    key.unbind('f, j')
    key.unbind('d, k')
    key.unbind('s, l')
  }

  render() {
    var reversedRounds = this.props.rounds.slice().reverse()

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
            <button id='rock' onClick={() => this.play(ROCK)}>Rock (F/J)</button>
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
            <button id='paper' onClick={() => this.play(PAPER)}>Paper (D/K)</button><br/>
            <span className="after-training"></span>
          </div>
          <div className="scissors action-container">
            <span className="before-training"></span><br/>
            <button id='scissors' onClick={() => this.play(SCISSORS)}>Scissors (S/L)</button><br/>
            <span className="after-training"></span>
          </div>
        </div>
        <div className='stats'>
          <h3>
            Games: <span id="total-games">{this.props.rounds.length}</span>
          </h3>
          <div className="all">
            Player 1 (Human) winning rate:
            <span id="player1-winning">{toPercentage(this.gameState.getPlayer1WinningRate())}</span>
          </div>
          { this.props.rounds.length >= 10 &&
            <div className="recent-10">
              Player 1 Winning rate (last 10 rounds):
              <span id="player1-winning-10">{toPercentage(this.gameState.getPlayer1WinningRate(10))}</span>
            </div>
          }
        </div>
        <div className='results'>
          {
            reversedRounds.forEach(function(item) {
              var player1Class = `player1 ${translateMove(player1Move)}`
              var player2Class = `player2 ${translateMove(player2Move)}`
              var resultClass = 'round '
              switch (result) {
                case 0:
                  resultClass += 'draw'
                  break
                case 1:
                  resultClass += 'player1'
                  break
                case 2:
                  resultClass += 'player2'
                  break
              }

              return (
                <div className={resultClass}>
                  <div className={player1Class}></div>
                  <div className="vs"></div>
                  <div className={player2Class}></div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default connect()(ComputerPlayerComponent)

