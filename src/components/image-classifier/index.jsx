import './index.less'

import key from 'keymaster'
import React, { Component } from 'react'
import { Container, Button, Progress } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Video from '../Video'
import Hidden from '../Hidden'
import drawActivations from './drawActivations'
import { ROCK, PAPER, SCISSORS, UNKNOWN } from '../../rps'
import * as actions from './actions'
import { STATE_KEY } from './reducers'
import { registerHandlers, deregisterHandlers } from './handlers'

@connect(state => ({ ...state[STATE_KEY] }))
export default class ImageClassifier extends Component {

  componentWillMount() {
    registerHandlers()
    this.props.dispatch(actions.initialize(this.props.implementation))
    key('g, h', () => this.props.dispatch(actions.capture()))
    key('f, j', () => this.flag(ROCK))
    key('d, k', () => this.flag(PAPER))
    key('s, l', () => this.flag(SCISSORS))
    key('a, ;', () => this.flag(UNKNOWN))
  }

  componentWillUnmount() {
    deregisterHandlers()
    key.unbind('g, h')
    key.unbind('f, j')
    key.unbind('d, k')
    key.unbind('s, l')
    key.unbind('a, ;')
  }

  render() {
    if (!this.props.initialized) {
      return <Hidden/>
    } else if (this.props.retrain) {
      return (
        <Container textAlign='center'>
          <p>
            Retraining in progress...
            &nbsp;&nbsp; <Button primary size='tiny' onClick={() => this.props.dispatch(actions.retrainCancel())}>Cancel</Button>
          </p>
          <div style={{width: '320px', display: 'inline-block'}}>
            <Progress percent={this.props.retrainProgress} success />
          </div>
        </Container>
      )
    }

    var before = this.props.before
    var after  = this.props.after

    return (
      <Container textAlign='center'>
        <p>
          <Video showCaptured={this.props.showTraining}/>
        </p>
        { !this.props.showTraining &&
          <div>
            <p>
              <Button primary onClick={() => this.props.dispatch(actions.capture())}>Capture (G/H)</Button>
              { this.props.captured &&
                <Button onClick={() => this.props.dispatch(actions.showTraining())}>Show Last</Button>
              }
            </p>
            <p>
              <Button size='tiny' onClick={() => this.props.dispatch(actions.retrain())}>Retrain with existing data</Button>&nbsp;&nbsp;&nbsp;
              <Button size='tiny' onClick={() => this.props.dispatch(actions.reset())}>Reset</Button>
            </p>
            <p className="load-save-container">
              <Button size='tiny' onClick={() => this.props.dispatch(actions.load())}>Load trained model</Button>&nbsp;&nbsp;&nbsp;
              <Button size='tiny' onClick={() => this.props.dispatch(actions.save())}>Save trained model</Button>
              <br/>
            </p>
          </div>
        }
        { this.props.showTraining &&
          <div id="training-container" style={{ display: this.props.image ? '' : 'none' }}>
            { this.props.showTraining &&
              <p>
                <Button primary onClick={() => this.props.dispatch(actions.cancel())}>Cancel</Button>
              </p>
            }
            <p className="save-training-data-container">
              <label>
                <input type="checkbox"
                  defaultChecked={this.props.saveFlag}
                  onChange={() => this.props.dispatch(actions.toggleSaveFlag())} />
                <span> Auto save training data</span>
              </label>
              <br/>
              <Button size='tiny' onClick={() => this.props.dispatch(actions.clearTraining())}>Clear training data</Button>
            </p>
            {
              [
                { name: 'rock',     label: 'Rock (F/J)',     value: ROCK },
                { name: 'paper',    label: 'Paper (D/K)',    value: PAPER },
                { name: 'scissors', label: 'Scissors (S/L)', value: SCISSORS },
                { name: 'unknown',  label: 'Unknown (A/;)',  value: UNKNOWN },
              ].map((item, index) =>
                <div key={index} className={`${item.name} class-container`}>
                  { before &&
                    <span className="before-training">
                      { before.w[index].toFixed(4) }
                      <br/>
                    </span>
                  }
                  <Button primary size='tiny' onClick={() => this.props.dispatch(actions.flag(item.value))}>{item.label}</Button><br/>
                  { after &&
                    <span className="after-training">
                      { after.w[index].toFixed(4) }
                    </span>
                  }
                </div>
              )
            }
            { this.props.layers && this.props.layers.length > 0 &&
              <div className="model-debug" style={{padding: '15px'}}>
                { this.props.layers.map((layer, index) =>
                    <div key={index} style={{margin: '10px 0', padding: '5px 0 10px', background: '#bee'}}>
                      <div>{ layer.type }</div>
                      { drawActivations(layer.data).map((image, imageIndex) =>
                          <img key={imageIndex}
                            src={image}
                            style={{ border: '1px solid gray', margin: '1px' }}/>
                        )
                      }
                    </div>
                  )
                }
              </div>
            }
          </div>
        }
        <br/>
        <br/>
        <br/>
      </Container>
    )
  }
}
