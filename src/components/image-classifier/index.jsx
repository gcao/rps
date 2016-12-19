/* globals fetch */
import './index.less'

import key from 'keymaster'
import React, { Component } from 'react'
import { Container, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Video from '../Video'
import { ROCK, PAPER, SCISSORS, UNKNOWN, shuffle, translateMove } from '../../rps'
import { ImageClassifierProxy } from '../../rps/image-classifier'
import { addReducer, removeReducer } from '../../reducers'
import reducers from './reducers'
import * as actions from './actions'

const SHOW_TRAINING_TIMEOUT = 1500

class ImageClassifier extends Component {
  constructor(props) {
    super(props)

    this.dispatch = props.dispatch

    this.dispatch(addReducer(reducers))

    let implementation = window[this.props.name || 'DefaultImageClassifier']
    this.imageClassifier = new ImageClassifierProxy(implementation)

    key('g, h', this.capture)
    key('f, j', () => this.flag(ROCK))
    key('d, k', () => this.flag(PAPER))
    key('s, l', () => this.flag(SCISSORS))
    key('a, ;', () => this.flag(UNKNOWN))
  }

  componentWillUnmount() {
    this.dispatch(removeReducer(reducers))

    key.unbind('g, h')
    key.unbind('f, j')
    key.unbind('d, k')
    key.unbind('s, l')
    key.unbind('a, ;')
  }

  capture = () => {
    let image = this.video.capture()
    let result = this.imageClassifier.predict(image)
    let before = result.prediction
    this.dispatch(actions.capture({
      image,
      before,
      after: undefined,
      captured: true,
      flagged: false,
      showTraining: true,
    }))
  }

  flag = (imageClass) => {
    if (this.props.saveFlag) {
      let saveAs = 'data/image-classifier/' + translateMove(imageClass) + (Math.random()*100000).toFixed(0) + '.json'
      fetch(saveAs, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.props.image),
      })
    }

    this.imageClassifier.train(this.props.image, imageClass)
    let result = this.imageClassifier.predict(this.props.image)
    let after = result.prediction
    this.dispatch(actions.flag({
      imageClass,
      after,
      flagged: true,
    }))

    // Hide training
    setTimeout(() => this.dispatch(actions.update({showTraining: false})), SHOW_TRAINING_TIMEOUT)
  }

  clearTrainingData = () => {
    fetch('data/image-classifier/', {method: 'POST'})
  }

  reset = () => {
    console.log('TODO: ImageClassifier.reset')
  }

  toggleSaveFlag = () => {
    this.dispatch(actions.toggleSaveFlag({saveFlag: this.props.saveFlag}))
  }

  retrain = () => {
    fetch('data/image-classifier/').then(imageUrls => {
      shuffle(imageUrls).forEach(function(imageUrl) {
        var imageClass
        if (imageUrl.match(/rock/)) {
          imageClass = ROCK
        } else if (imageUrl.match(/paper/)) {
          imageClass = PAPER
        } else if (imageUrl.match(/scissors/)) {
          imageClass = SCISSORS
        } else {
          imageClass = UNKNOWN
        }

        fetch(imageUrl).then(imageData => {
          this.imageClassifier.train(imageData, imageClass)
        })
      })
    })
  }

  load = () => {
    console.log('TODO: ImageClassifier.load')
  }

  save = () => {
    console.log('TODO: ImageClassifier.save')
  }

  setVideo = (video) => {
    this.video = video
  }

  showLast = () => {
    this.dispatch(actions.update({showTraining: true}))
  }

  hideTraining = () => {
    this.dispatch(actions.update({showTraining: false}))
  }

  render() {
    var before = this.props.before
    var after  = this.props.after

    return (
      <Container textAlign='center'>
        <p>
          <Video showCaptured={this.props.showTraining} ref={ this.setVideo }/>
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

function mapStateToProps(state) {
  return state.imageClassifier || {}
}

export default connect(mapStateToProps)(ImageClassifier)
