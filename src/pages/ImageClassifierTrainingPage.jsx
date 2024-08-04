import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'
import { Link } from 'react-router'
import Layout from '../components/Layout'
import ImageClassifier from '../components/image-classifier'

export default class ImageClassifierTrainingPage extends Component {
  render() {
    return (
      <Layout>
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
      </Layout>
    )
  }
}
