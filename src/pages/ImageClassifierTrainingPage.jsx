import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import ImageClassifier, { initializeImageClassifier } from '../components/image-classifier'

import { ReducerGroup } from '../reducers'

class ImageClassifierTrainingPage extends Component {
  constructor(props) {
    super(props)

    let reducers = new ReducerGroup()
    const initialState = {
    }

    this.store = createStore(reducers.handle, initialState)
    this.store.dispatch(initializeImageClassifier())
  }

  render() {
    return (
      <Provider store={this.store}>
        <ImageClassifier
        />
      </Provider>
    )
  }
}

export default ImageClassifierTrainingPage
