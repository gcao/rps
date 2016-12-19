import React, { Component } from 'react'
import { Container, Header } from 'semantic-ui-react'
import { Link } from 'react-router'
import ImageClassifier from '../components/image-classifier'

export default class ImageClassifierTrainingPage extends Component {
  render() {
    return (
      <Container textAlign='center'>
        <Header>Train the machine to recognize your action</Header>
        <p>When training is complete, click <Link to="/">here</Link> to play!</p>
        <ImageClassifier/>
      </Container>
    )
  }
}
