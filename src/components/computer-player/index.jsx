import './index.less'

import key from 'keymaster'
import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Result from '../result'
import { ROCK, PAPER, SCISSORS } from '../../rps'
import { initialize as initComputerPlayer, play } from './actions'
import './reducers'

function mapStateToProps({rounds, computerPlayer}) {
  return { rounds, ...computerPlayer }
}

@connect(mapStateToProps)
export default class ComputerPlayer extends Component {
  constructor(props) {
    super(props)

    this.props.dispatch(initComputerPlayer(this.props.name))

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
