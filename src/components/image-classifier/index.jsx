import key from 'keymaster'
import React, { Component } from 'react'
import { Container, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

import {
  ROCK, PAPER, SCISSORS, UNKNOWN,
} from '../../rps'

import './index.less'

import { addReducer, removeReducer } from '../../reducers'
import reducers from './reducers'
import * as actions from './actions'

class ImageClassifierComponent extends Component {
  constructor(props) {
    super(props)

    this.props.dispatch(addReducer(reducers))
    this.props.dispatch(actions.initialize())

    key('g, h', () => this.capture())
    key('f, j', () => this.flag(ROCK))
    key('d, k', () => this.flag(PAPER))
    key('s, l', () => this.flag(SCISSORS))
    key('a, ;', () => this.flag(SCISSORS))
  }

  componentDidMount() {
    var self = this
    var constraints = {
      video: {
        mandatory: {
          maxWidth: 320,
          maxHeight: 240
        }
      }
    }

    navigator.getUserMedia = navigator.getUserMedia ||
                             navigator.webkitGetUserMedia ||
                             navigator.mozGetUserMedia

    navigator.getUserMedia(constraints, function(stream) {
      self.videoElem.src = window.URL.createObjectURL(stream)
    }, function(e) {
      console.log('Access to camera is rejected!', e)
    })
  }

  componentWillUnmount() {
    this.props.dispatch(removeReducer(reducers))
    this.props.dispatch(actions.destroy())

    key.unbind('g, h')
    key.unbind('f, j')
    key.unbind('d, k')
    key.unbind('s, l')
    key.unbind('a, ;')
  }

  capture() {
    var ctx = this.canvasElem.getContext('2d')
    ctx.drawImage(this.videoElem, 0, 0)

    var imagePixels = ctx.getImageData(0, 0, 320, 240)
    this.image = []
    for (var i=0; i<320; i++) {
      this.image[i] = []
      for (var j=0; j<240; j++) {
        var pixelIndex = (i * 4) * 240 + j * 4
        // http://www.ajaxblender.com/howto-convert-image-to-grayscale-using-javascript.html
        var grayScale = Math.round((imagePixels.data[pixelIndex] + imagePixels.data[pixelIndex + 1] + imagePixels.data[pixelIndex + 2])/3)
        this.image[i].push(grayScale)
      }
    }

    this.props.dispatch(actions.capture(this.image))
  }

  clearTrainingData() {
    //jQuery.ajax({ url: 'data/image-classifier/', type: 'DELETE' })
  }

  reset() {
    this.props.dispatch(actions.initialize())
  }

  flag(imageClass) {
    this.props.dispatch(actions.flag(this.image, imageClass, this.props.saveFlag))
  }

  toggleSaveFlag() {
    this.props.dispatch(actions.toggleSaveFlag(this.props.saveFlag))
  }

  retrain() {
    //jQuery.getJSON('data/image-classifier/', function(imageUrls) {
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

    //    jQuery.getJSON(imageUrl, function(imageData) {
    //      imageClassifier.train(imageData, imageClass)
    //    })
    //  })
    //})
  }

  render() {
    let self = this
    var before = this.props.before
    var after  = this.props.after

    return (
      <Container textAlign='center'>
        <p>
          <video autoPlay ref={elem => this.videoElem = elem}/>
        </p>
        <p>
          <Button primary onClick={ () => self.capture() }>Capture (G/H)</Button>
        </p>
        <p>
          <Button size='tiny' onClick={ () => self.retrain() }>Retrain with existing data</Button>&nbsp;&nbsp;&nbsp;
          <Button size='tiny' onClick={ () => self.reset() }>Reset</Button>
        </p>
        <p className="load-save-container">
          <Button size='tiny' onClick={ () => self.imageClassifier.load() }>Load trained model</Button>&nbsp;&nbsp;&nbsp;
          <Button size='tiny' onClick={ () => self.imageClassifier.save() }>Save trained model</Button>
          <br/>
        </p>
        <div id="training-container" style={{ display: this.props.image ? '' : 'none' }}>
          <p>
            <canvas width="320px" height="240px" ref={elem => this.canvasElem = elem}/>
          </p>
          <p className="save-training-data-container">
            <label>
              <input type="checkbox" onClick={ () => self.toggleSaveFlag() }/>
              <span> Auto save training data</span>
            </label>
            <br/>
            <Button size='tiny' onClick={ () => self.clearTrainingData() }>Clear training data</Button>
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
                <Button primary size='tiny' onClick={ () => self.flag(item.value) }>{item.label}</Button><br/>
                { after &&
                  <span className="after-training">
                    { after.w[index].toFixed(4) }
                  </span>
                }
              </div>
            )
          }
        </div>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return state.imageClassifier || {}
}

export default connect(mapStateToProps)(ImageClassifierComponent)
