import key from 'keymaster'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import './index.less'

import { ROCK, PAPER, SCISSORS, computeResult, translateMove } from '../../rps'
import GameState  from '../../rps/GameState'

import { defaultReducers } from '../../reducers'
import reducers from './reducers'
import { play, initialize } from './actions'
export { initialize as initializeComputerPlayer }

defaultReducers.add(reducers)

function toPercentage(val, digitsAfterDot) {
  digitsAfterDot = digitsAfterDot || 2
  return (val * 100).toFixed(digitsAfterDot) + '%'
}

class ComputerPlayerComponent extends Component {
  constructor(props) {
    super(props)

    key('f, j', () => this.play(ROCK))
    key('d, k', () => this.play(PAPER))
    key('s, l', () => this.play(SCISSORS))
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
    var gameState = new GameState(this.props.rounds)
    var reversedRounds = this.props.rounds.slice().reverse()
    var before = this.props.prediction && this.props.prediction.before
    var after  = this.props.prediction && this.props.prediction.after

    return (
      <div>
        <h1>Train the AI player</h1>
        <div>
          {
            [
              { name: 'rock',     label: 'Rock (F/J)',     move: ROCK },
              { name: 'paper',    label: 'Paper (D/K)',    move: PAPER },
              { name: 'scissors', label: 'Scissors (S/L)', move: SCISSORS },
            ].map((item, index) =>
              <div key={index} className={`${item.name} action-container`}>
                { before && before.prediction &&
                  <span className="before-training">
                    {before.prediction.w[index].toFixed(4)}
                    <br/>
                  </span>
                }
                <button onClick={() => this.play(item.move)}>{item.label}</button>
                { before && before.prediction &&
                  <span className="after-training">
                    {after.prediction.w[index].toFixed(4)}
                    <br/>
                    <br/>
                  </span>
                }
              </div>
            )
          }
        </div>
        <div className='stats'>
          <h3>
            Games: <span id="total-games">{this.props.rounds.length}</span>
          </h3>
          <div className="all">
            Player 1 (Human) winning rate:
            <span id="player1-winning">{toPercentage(gameState.getPlayer1WinningRate())}</span>
          </div>
          { this.props.rounds.length >= 10 &&
            <div className="recent-10">
              Player 1 Winning rate (last 10 rounds):
              <span id="player1-winning-10">{toPercentage(gameState.getPlayer1WinningRate(10))}</span>
            </div>
          }
        </div>
        <div className='results'>
          {
            reversedRounds.map(function(item, index) {
              var player1Move = item[0]
              var player2Move = item[1]
              var player1Class = `player1 ${translateMove(player1Move)}`
              var player2Class = `player2 ${translateMove(player2Move)}`
              var result = computeResult(player1Move, player2Move)
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
                <div key={`${reversedRounds.length}-${index}`} className={resultClass}>
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

