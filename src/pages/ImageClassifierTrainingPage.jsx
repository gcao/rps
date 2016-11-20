import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import ImageClassifier from '../components/image-classifier'

class ImageClassifierTrainingPage extends Component {
  render() {
    return (
      <div>
        <p>When training is complete, click <Link to="/">here</Link> to play!</p>
        <ImageClassifier/>
      </div>
    )
  }
}

export default connect()(ImageClassifierTrainingPage)
