import React, { Component } from 'react'
import { connect } from 'react-redux'

import ImageClassifier from '../components/image-classifier'

class ImageClassifierTrainingPage extends Component {
  render() {
    return (
        <ImageClassifier/>
    )
  }
}

export default connect()(ImageClassifierTrainingPage)
