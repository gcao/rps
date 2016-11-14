import jQuery from 'jquery'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { ROCK, PAPER, SCISSORS, UNKNOWN, shuffle } from '../../rps'

import './index.less'

import { defaultReducers } from '../../reducers'
import reducers from './reducers'
import { initialize } from './actions'
export { initialize as initializeImageClassifier }

defaultReducers.add(reducers)

class ImageClassifierComponent extends Component {
  constructor(props) {
    super(props)

    //if (window.loadAndSave) {
    //  jQuery('.load-save-container').hide()
    //  imageClassifier.load()
    //  window.onunload = function() {
    //    imageClassifier.save()
    //  }
    //}

    var imageData

    var video = document.querySelector('video')
    var canvas = document.querySelector('canvas')
    var ctx = canvas.getContext('2d')
    var localMediaStream = null
    var constraints = {
      video: {
        mandatory: {
          maxWidth: 320,
          maxHeight: 240
        }
      }
    }

    // TODO make this platform independent
    navigator.webkitGetUserMedia.call(navigator, constraints, function(stream) {
      video.src = window.URL.createObjectURL(stream)
      localMediaStream = stream
    }, function(e) {
      console.log('Access to camera is rejected!', e)
    })

  }

  capture() {
    if (localMediaStream) {
      document.querySelector('#training-container').style.display = ''

      ctx.drawImage(video, 0, 0)
      canvas.style.display = ""

      var imagePixels = ctx.getImageData(0, 0, 320, 240)
      imageData = []
      for (var i=0; i<320; i++) {
        imageData[i] = []
        for (var j=0; j<240; j++) {
          var pixelIndex = (i * 4) * 240 + j * 4
          // http://www.ajaxblender.com/howto-convert-image-to-grayscale-using-javascript.html
          var grayScale = Math.round((imagePixels.data[pixelIndex] + imagePixels.data[pixelIndex + 1] + imagePixels.data[pixelIndex + 2])/3)
          imageData[i].push(grayScale)
        }
      }

      var result = imageClassifier.predict(imageData)
      var w = result.prediction.w
      jQuery('.rock     .before-training').text(w[ROCK].toFixed(4))
      jQuery('.paper    .before-training').text(w[PAPER].toFixed(4))
      jQuery('.scissors .before-training').text(w[SCISSORS].toFixed(4))
      jQuery('.unknown  .before-training').text(w[UNKNOWN].toFixed(4))

      jQuery('.rock     .after-training').text('')
      jQuery('.paper    .after-training').text('')
      jQuery('.scissors .after-training').text('')
      jQuery('.unknown  .after-training').text('')
    }
  }

  saveTrainingData(imageClass, imageData) {
    if (jQuery('#save-training-data').is(':checked')) {
      var saveAs = 'data/image-classifier/' + translateMove(imageClass) + (Math.random()*100000).toFixed(0) + '.json'
      jQuery.post(saveAs, JSON.stringify(imageData))
    }
  }

  clearTrainingData() {
    jQuery.ajax({ url: 'data/image-classifier/', type: 'DELETE' })
  }

  reset() {
    imageClassifier.reset()
  }

  flag(imageClass) {
    saveTrainingData(imageClass, imageData)

    imageClassifier.train(imageData, imageClass)

    var result = imageClassifier.predict(imageData)
    var w = result.prediction.w
    jQuery('.rock     .after-training').text(w[ROCK].toFixed(4))
    jQuery('.paper    .after-training').text(w[PAPER].toFixed(4))
    jQuery('.scissors .after-training').text(w[SCISSORS].toFixed(4))
    jQuery('.unknown  .after-training').text(w[UNKNOWN].toFixed(4))
  }

  retrain() {
    jQuery.getJSON('data/image-classifier/', function(imageUrls) {
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

        jQuery.getJSON(imageUrl, function(imageData) {
          imageClassifier.train(imageData, imageClass)
        })
      })
    })
  }

  render() {
    return (
      <div>
        <p>
          <video autoplay></video>
        </p>
        <p>
          <button onclick='capture()'>Capture (G/H)</button>
          <br/>
          <button id='retrain' onclick='retrain()'>Retrain with existing data</button>&nbsp;&nbsp;&nbsp
          <button onclick='reset()'>Reset</button>
          <br/>
          <span class="load-save-container">
            <button onclick='imageClassifier.load()'>Load trained model</button>&nbsp;&nbsp;&nbsp
            <button onclick='imageClassifier.save()'>Save trained model</button>
            <br/>
          </span>
          <span>When training is complete, click <a href="index.html">here</a> to play!</span>
        </p>
        <div id="training-container" style="display:none">
          <p>
            <canvas style="display:none;" width="320px" height="240px"></canvas>
          </p>
          <p>
            <div class="save-training-data-container">
              <label>
                <input type="checkbox" id="save-training-data"/>
                <span>Auto save training data</span>
              </label>
              <br/>
              <button onclick='clearTrainingData()'>Clear training data</button>
            </div>
            <div class="rock class-container">
              <span class="before-training"></span><br/>
              <button id='rock' onclick="flag(ROCK)">Rock (F/J)</button><br/>
              <span class="after-training"></span>
            </div>
            <div class="paper class-container">
              <span class="before-training"></span><br/>
              <button id='paper'    onclick="flag(PAPER)">Paper (D/K)</button><br/>
              <span class="after-training"></span>
            </div>
            <div class="scissors class-container">
              <span class="before-training"></span><br/>
              <button id='scissors' onclick="flag(SCISSORS)">Scissors (S/L)</button><br/>
              <span class="after-training"></span>
            </div>
            <div class="unknown class-container">
              <div class="before-vis">&nbsp;</div>
              <span class="before-training"></span><br/>
              <button id='unknown'  onclick="flag(UNKNOWN)">Unknown (A/;)</button><br/>
              <div class="after-vis">&nbsp;</div>
              <span class="after-training"></span>
            </div>
          </p>
        </div>
      </div>
    )
  }
}

export default connect()(ImageClassifierComponent)

