import key from 'keymaster'
import React, { Component } from 'react'
import { Button, Progress } from 'semantic-ui-react'
import { connect } from 'react-redux'

import './index.less'

import { ROCK, PAPER, SCISSORS, computeResult, translateMove } from '../../rps'
import GameState  from '../../rps/GameState'

import { addReducer, removeReducer } from '../../reducers'
import reducers from './reducers'
import { play, initialize } from './actions'

function toPercentage(val, digitsAfterDot) {
  digitsAfterDot = digitsAfterDot || 2
  return (val * 100).toFixed(digitsAfterDot) + '%'
}

class ComputerPlayerComponent extends Component {
  constructor(props) {
    super(props)

    this.props.dispatch(addReducer(reducers))
    this.props.dispatch(initialize(this.props.computerPlayer))

    key('f, j', () => this.play(ROCK))
    key('d, k', () => this.play(PAPER))
    key('s, l', () => this.play(SCISSORS))
  }

  play(move) {
    this.props.dispatch(play(move))
  }

  componentWillUnmount() {
    this.props.dispatch(removeReducer(reducers))

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
                <Button primary size='small' style={{width: '120px'}} onClick={() => this.play(item.move)}>{item.label}</Button>
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
        <div className='stats' style={{ padding: '20px' }}>
          <h3>
            Games played: <span id="total-games">{this.props.rounds.length}</span>
          </h3>
          <div className="all">
            Your winning rate: <span id="player1-winning">{toPercentage(gameState.getPlayer1WinningRate())}</span>
            <div style={{display: 'inline-block', width: '150px'}}>
              <Progress size='small' percent={100 * gameState.getPlayer1WinningRate()} success style={{margin: '0 5px', height: '1em'}}/>
            </div>
          </div>
          { this.props.rounds.length >= 10 &&
            <div className="recent-10">
              Player 1 Winning rate (last 10 rounds):
              <span id="player1-winning-10">{toPercentage(gameState.getPlayer1WinningRate(10))}</span>
            </div>
          }
        </div>
        <div className='results'>
          <div style={{display: 'inline-block', width: '49%', textAlign: 'right', padding: '0 8px'}}>You</div>
          <div style={{display: 'inline-block', width: '49%', textAlign: 'left', padding: '0 8px'}}>The Machine</div>
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
                <div key={`${reversedRounds.length}-${index}`} className={resultClass} style={{padding: '1px'}}>
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

function mapStateToProps({rounds, computerPlayer}) {
  return {
    rounds,
    ...computerPlayer,
  }
}

export default connect(mapStateToProps)(ComputerPlayerComponent)

