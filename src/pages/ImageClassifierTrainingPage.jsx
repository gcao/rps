import React, { Component } from 'react'
import { Container, Header } from 'semantic-ui-react'
import { Link } from 'react-router'
import ImageClassifier from '../components/image-classifier'
import Layout from '../components/Layout'

export default class ImageClassifierTrainingPage extends Component {
  render() {
    return (
      <div>
        <Header>
          Train the machine to recognize your action
        </Header>

        <p>
          When training is complete, &nbsp;&nbsp;
          <b>
            <Link to="/">click here</Link>
          </b>
          &nbsp;&nbsp;to play!
        </p>

        <ImageClassifier/>
      </div>
    )
  }
}
