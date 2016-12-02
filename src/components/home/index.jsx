import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addReducer, removeReducer } from '../../reducers'
import reducers from './reducers'
import * as actions from './actions'

class Home extends Component {
  constructor(props) {
    super(props)

    this.props.dispatch(addReducer(reducers))
    this.props.dispatch(actions.initialize())
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
    this.props.dispatch(actions.destroy())
  }

  render() {
    return (
      <div>
        <p>
          <video autoPlay ref={elem => this.videoElem = elem}/>
        </p>
        <div id="training-container" style={{ display:'none' }}>
          <p>
            <img id='captured' src=""/>
          </p>
          <p id='not-recognized' style={{ display:'none' }}>Not recognized!</p>
        </div>
        <canvas style={{ display:'none' }} width="320px" height="240px"></canvas>
      </div>
    )
  }
}

export default connect()(Home)
