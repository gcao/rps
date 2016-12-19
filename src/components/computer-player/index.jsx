import './index.less'

import key from 'keymaster'
import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Result from '../result'
import { ROCK, PAPER, SCISSORS } from '../../rps'
import GameState from '../../rps/GameState'
import { ComputerPlayerProxy } from '../../rps/computer-player'
import { addReducer, removeReducer } from '../../reducers'
import reducers from './reducers'
import * as actions from './actions'

class ComputerPlayer extends Component {
  constructor(props) {
    super(props)

    let name = this.props.name || 'DefaultComputerPlayer'
    this.computerPlayer = new ComputerPlayerProxy(window[name])

    this.dispatch = props.dispatch
    this.dispatch(addReducer(reducers))
    this.dispatch(actions.initialize(name))

    key('f, j', () => this.play(ROCK))
    key('d, k', () => this.play(PAPER))
    key('s, l', () => this.play(SCISSORS))
  }

  play(move) {
    let gameState    = new GameState(this.props.rounds)
    let before       = this.computerPlayer.predict(gameState)
    let computerMove = before.winningMove

    this.computerPlayer.train(gameState, move)
    let after = this.computerPlayer.predict(gameState)

    let prediction = {
      before: before,
      after:  after,
    }

    this.dispatch(actions.play({
      player1Move: move,
      player2Move: computerMove,
      prediction,
    }))
  }

  componentWillUnmount() {
    this.dispatch(removeReducer(reducers))

    key.unbind('f, j')
    key.unbind('d, k')
    key.unbind('s, l')
  }

  render() {
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
        <Result rounds={this.props.rounds}/>
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

export default connect(mapStateToProps)(ComputerPlayer)

