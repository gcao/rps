declare let require: any

import './index.less'

let key: any = require('keymaster')
import * as React from 'react'
let { Button } = require('semantic-ui-react')
import { connect } from 'react-redux'
import Result from '../result'
import Hidden from '../Hidden'
import Move from '../../rps/Move'
import * as actions from './actions'
import { STATE_KEY } from './reducers'
import { registerHandlers, deregisterHandlers } from './handlers'

class ComputerPlayerComponent extends React.Component<any, any> {

  componentWillMount() {
    registerHandlers()
    this.props.dispatch(actions.initialize())
    key('f, j', () => this.props.dispatch(actions.play(Move.ROCK)))
    key('d, k', () => this.props.dispatch(actions.play(Move.PAPER)))
    key('s, l', () => this.props.dispatch(actions.play(Move.SCISSORS)))
  }

  componentWillUnmount() {
    deregisterHandlers()
    key.unbind('f, j')
    key.unbind('d, k')
    key.unbind('s, l')
  }

  render() {
    if (!this.props.initialized) {
      return <Hidden />
    }

    let before = this.props.prediction && this.props.prediction.before
    let after = this.props.prediction && this.props.prediction.after

    return (
      <div>
        <div>
          {
            [
              { name: 'rock', label: 'Rock (F/J)', move: Move.ROCK },
              { name: 'paper', label: 'Paper (D/K)', move: Move.PAPER },
              { name: 'scissors', label: 'Scissors (S/L)', move: Move.SCISSORS },
            ].map((item, index) =>
              <div key={index} className={`${item.name} action-container`}>
                {before && before.prediction &&
                  <span className='before-training'>
                    {before.prediction.w[index].toFixed(4)}
                    <br />
                  </span>
                }
                <Button primary
                  size='small'
                  style={{ width: '120px' }}
                  onClick={() => this.props.dispatch(actions.play(item.move))}
                >{item.label}</Button>
                {after && after.prediction &&
                  <span className='after-training'>
                    {after.prediction.w[index].toFixed(4)}
                    <br />
                    <br />
                  </span>
                }
              </div>
              )
          }
        </div>
        <Result rounds={this.props.rounds} />
      </div>
    )
  }
}

export default connect(state => ({ ...state[STATE_KEY] }))(ComputerPlayerComponent)