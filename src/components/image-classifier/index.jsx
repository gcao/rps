import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { ROCK, PAPER, SCISSORS, UNKNOWN } from '../../rps'

import './index.less'

import { addReducer, removeReducer } from '../../reducers'
import reducers from './reducers'
import { capture, flag, initialize } from './actions'

class ImageClassifierComponent extends Component {
  constructor(props) {
    super(props)

    this.props.dispatch(addReducer(reducers))
    this.props.dispatch(initialize())
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
          <span>When training is complete, click <Link to="/">here</Link> to play!</span>
        </div>
        <div id="training-container">
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
          <div className="rock class-container">
            <span className="before-training"></span><br/>
            <button onClick={ () => self.flag(ROCK) }>Rock (F/J)</button><br/>
            <span className="after-training"></span>
          </div>
          <div className="paper class-container">
            <span className="before-training"></span><br/>
            <button onClick={ () => self.flag(PAPER) }>Paper (D/K)</button><br/>
            <span className="after-training"></span>
          </div>
          <div className="scissors class-container">
            <span className="before-training"></span><br/>
            <button onClick={ () => self.flag(SCISSORS) }>Scissors (S/L)</button><br/>
            <span className="after-training"></span>
          </div>
          <div className="unknown class-container">
            <div className="before-vis">&nbsp;</div>
            <span className="before-training"></span><br/>
            <button onClick={ () => self.flag(UNKNOWN) }>Unknown (A/;)</button><br/>
            <div className="after-vis">&nbsp;</div>
            <span className="after-training"></span>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(ImageClassifierComponent)

