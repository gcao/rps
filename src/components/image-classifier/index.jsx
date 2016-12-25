import './index.less'

import key from 'keymaster'
import React, { Component } from 'react'
import { Container, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Video from '../Video'
import { ROCK, PAPER, SCISSORS, UNKNOWN } from '../../rps'
import { STATE_KEY } from './reducers'
import { initialize as initImageClassifier, capture, flag, toggleSaveFlag, update } from './actions'
import './handlers'

function mapStateToProps(state) {
  return state[STATE_KEY] || {}
}

@connect(mapStateToProps)
export default class ImageClassifier extends Component {
  constructor(props) {
    super(props)

    this.reset()

    key('g, h', this.capture)
    key('f, j', () => this.flag(ROCK))
    key('d, k', () => this.flag(PAPER))
    key('s, l', () => this.flag(SCISSORS))
    key('a, ;', () => this.flag(UNKNOWN))
  }

  componentWillUnmount() {
    key.unbind('g, h')
    key.unbind('f, j')
    key.unbind('d, k')
    key.unbind('s, l')
    key.unbind('a, ;')
  }

  capture = () => {
    this.props.dispatch(capture())
  }

  flag = (imageClass) => {
    this.props.dispatch(flag({imageClass}))
  }

  clearTrainingData = () => {
    //fetch('data/image-classifier/', {method: 'POST'})
  }

  reset = () => {
    this.props.dispatch(initImageClassifier(this.props.name))
  }

  toggleSaveFlag = () => {
    this.props.dispatch(toggleSaveFlag({saveFlag: this.props.saveFlag}))
  }

  retrain = () => {
    //fetch('data/image-classifier/').then(imageUrls => {
    //  shuffle(imageUrls).forEach(function(imageUrl) {
    //    var imageClass
    //    if (imageUrl.match(/rock/)) {
    //      imageClass = ROCK
    //    } else if (imageUrl.match(/paper/)) {
    //      imageClass = PAPER
    //    } else if (imageUrl.match(/scissors/)) {
    //      imageClass = SCISSORS
    //    } else {
    //      imageClass = UNKNOWN
    //    }

    //    fetch(imageUrl).then(imageData => {
    //      this.imageClassifier.train(imageData, imageClass)
    //    })
    //  })
    //})
  }

  load = () => {
    //this.imageClassifier.load()
  }

  save = () => {
    //this.imageClassifier.save()
  }

  showLast = () => {
    this.props.dispatch(update({showTraining: true}))
  }

  hideTraining = () => {
    this.props.dispatch(update({showTraining: false}))
  }

  render() {
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
              <Button primary onClick={ this.capture }>Capture (G/H)</Button>
              { this.props.captured &&
                <Button onClick={ this.showLast }>Show Last</Button>
              }
            </p>
            <p>
              <Button size='tiny' onClick={ this.retrain }>Retrain with existing data</Button>&nbsp;&nbsp;&nbsp;
              <Button size='tiny' onClick={ this.reset }>Reset</Button>
            </p>
            <p className="load-save-container">
              <Button size='tiny' onClick={ this.load }>Load trained model</Button>&nbsp;&nbsp;&nbsp;
              <Button size='tiny' onClick={ this.save }>Save trained model</Button>
              <br/>
            </p>
          </div>
        }
        { this.props.showTraining &&
          <div id="training-container" style={{ display: this.props.image ? '' : 'none' }}>
            { this.props.showTraining &&
              <p>
                <Button primary onClick={ this.hideTraining }>Cancel</Button>
              </p>
            }
            <p className="save-training-data-container">
              <label>
                <input type="checkbox" onClick={ this.toggleSaveFlag }/>
                <span> Auto save training data</span>
              </label>
              <br/>
              <Button size='tiny' onClick={ this.clearTrainingData }>Clear training data</Button>
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
                  <Button primary size='tiny' onClick={ () => this.flag(item.value) }>{item.label}</Button><br/>
                  { after &&
                    <span className="after-training">
                      { after.w[index].toFixed(4) }
                    </span>
                  }
                </div>
              )
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
