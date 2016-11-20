import key from 'keymaster'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { ROCK, PAPER, SCISSORS, UNKNOWN } from '../../rps'

import './index.less'

import { addReducer, removeReducer } from '../../reducers'
import reducers from './reducers'
import { capture, flag, initialize } from './actions'

class ImageClassifierComponent extends Component {
  constructor(props) {
    super(props)

    debugger
    this.props.dispatch(addReducer(reducers))
    this.props.dispatch(initialize())

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
    var imageData = []
    for (var i=0; i<320; i++) {
      imageData[i] = []
      for (var j=0; j<240; j++) {
        var pixelIndex = (i * 4) * 240 + j * 4
        // http://www.ajaxblender.com/howto-convert-image-to-grayscale-using-javascript.html
        var grayScale = Math.round((imagePixels.data[pixelIndex] + imagePixels.data[pixelIndex + 1] + imagePixels.data[pixelIndex + 2])/3)
        imageData[i].push(grayScale)
      }
    }

    this.props.dispatch(capture(imageData))
  }

  saveTrainingData(imageClass, imageData) {
    //if (jQuery('#save-training-data').is(':checked')) {
    //  var saveAs = 'data/image-classifier/' + translateMove(imageClass) + (Math.random()*100000).toFixed(0) + '.json'
    //  jQuery.post(saveAs, JSON.stringify(imageData))
    //}
  }

  clearTrainingData() {
    //jQuery.ajax({ url: 'data/image-classifier/', type: 'DELETE' })
  }

  reset() {
    this.imageClassifier.reset()
  }

  flag(imageClass) {
    this.props.dispatch(flag(imageClass))

    //this.saveTrainingData(imageClass, this.imageData)

    //this.imageClassifier.train(this.imageData, imageClass)

    //var result = imageClassifier.predict(imageData)
    //var w = result.prediction.w
    //jQuery('.rock     .after-training').text(w[ROCK].toFixed(4))
    //jQuery('.paper    .after-training').text(w[PAPER].toFixed(4))
    //jQuery('.scissors .after-training').text(w[SCISSORS].toFixed(4))
    //jQuery('.unknown  .after-training').text(w[UNKNOWN].toFixed(4))
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
    var before = this.props.prediction && this.props.prediction.before
    var after  = this.props.prediction && this.props.prediction.after

    return (
      <div>
        <div>
          <video autoPlay ref={elem => this.videoElem = elem}/>
        </div>
        <div style={{ padding: '20px' }}>
          <button onClick={ () => self.capture() }>Capture (G/H)</button>
          <br/>
          <button onClick={ () => self.retrain() }>Retrain with existing data</button>&nbsp;&nbsp;&nbsp;
          <button onClick={ () => self.reset() }>Reset</button>
          <br/>
          <span className="load-save-container">
            <button onClick={ () => self.imageClassifier.load() }>Load trained model</button>&nbsp;&nbsp;&nbsp;
            <button onClick={ () => self.imageClassifier.save() }>Save trained model</button>
            <br/>
          </span>
        </div>
        <div id="training-container" style={{ display: this.props.image ? '' : 'none' }}>
          <div>
            <canvas width="320px" height="240px" ref={elem => this.canvasElem = elem}/>
          </div>
          <div className="save-training-data-container">
            <label>
              <input type="checkbox" id="save-training-data"/>
              <span>Auto save training data</span>
            </label>
            <br/>
            <button onClick={ () => self.clearTrainingData() }>Clear training data</button>
          </div>
          {
            [
              { name: 'rock',     label: 'Rock (F/J)',     value: ROCK },
              { name: 'paper',    label: 'Paper (D/K)',    value: PAPER },
              { name: 'scissors', label: 'Scissors (S/L)', value: SCISSORS },
              { name: 'unknown',  label: 'Unknown (A/;)',  value: UNKNOWN },
            ].map((item, index) =>
              <div key={index} className={`${item.name} class-container`}>
                { before && before.prediction &&
                  <span className="before-training">
                    { before.prediction.w[index].toFixed(4) }
                    <br/>
                  </span>
                }
                <button onClick={ () => self.flag(item.value) }>{item.label}</button><br/>
                { after && after.prediction &&
                  <span className="after-training">
                    { after.prediction.w[index].toFixed(4) }
                  </span>
                }
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state.imageClassifier
}

export default connect(mapStateToProps)(ImageClassifierComponent)
