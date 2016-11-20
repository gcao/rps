import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import ImageClassifier from '../components/image-classifier'

class ImageClassifierTrainingPage extends Component {
  render() {
    return (
      <div>
        <ImageClassifier/>
        <Link to='/'>Back</Link>
      </div>
    )
  }
}

export default connect()(ImageClassifierTrainingPage)
