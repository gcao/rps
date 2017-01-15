declare let require: any

import './index.less'

import * as React from 'react'
let { Progress } = require('semantic-ui-react')
import { computeResult, translateMove } from '../../rps'
import GameState from '../../rps/GameState'
import Round from '../../rps/Round'

function toPercentage(val: number, digitsAfterDot = 2) {
  return (val * 100).toFixed(digitsAfterDot) + '%'
}

class Result extends React.Component<any, any> {
  render() {
    let gameState = new GameState(this.props.rounds)
    let reversedRounds = this.props.rounds.slice().reverse()

    return (
      <div>
        <div className='stats' style={{ padding: '20px' }}>
          <h3>
            Games played: <span id='total-games'>{this.props.rounds.length}</span>
          </h3>
          {this.props.rounds.length > 0 &&
            <div className='all'>
              Your winning rate: <span id='player1-winning'>{toPercentage(gameState.getPlayer1WinningRate())}</span>
              <div style={{ display: 'inline-block', width: '150px' }}>
                <Progress size='small' percent={100 * gameState.getPlayer1WinningRate()} success style={{ margin: '0 5px', height: '1em' }} />
              </div>
            </div>
          }
          {this.props.rounds.length >= 10 &&
            <div className='recent-10'>
              Player 1 Winning rate (last 10 rounds):
              <span id='player1-winning-10'>{toPercentage(gameState.getPlayer1WinningRate(10))}</span>
            </div>
          }
        </div>
        {this.props.rounds.length > 0 &&
          <div>
            <div style={{ display: 'inline-block', width: '49%', textAlign: 'right', padding: '0 8px' }}>You</div>
            <div style={{ display: 'inline-block', width: '49%', textAlign: 'left', padding: '0 8px' }}>The Machine</div>
          </div>
        }
        <div className='results'>
          {
            reversedRounds.map(function(round: Round, index: number) {
              let player1Move = round.player1Move
              let player2Move = round.player2Move
              let player1Class = `player1 ${translateMove(player1Move)}`
              let player2Class = `player2 ${translateMove(player2Move)}`
              let result = computeResult(player1Move, player2Move)
              let resultClass = 'round '

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
                <div key={`${reversedRounds.length}-${index}`} className={resultClass} style={{ padding: '1px' }}>
                  <div className={player1Class}></div>
                  <div className='vs'></div>
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

export default Result