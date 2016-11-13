import React, { Component } from 'react';

import ComputerPlayerUI from './components/ComputerPlayerUI';

import './App.less';

export default class App extends Component {
  render() {
    return (
      <div>
        <ComputerPlayerUI/>
      </div>
    );
  }
};

