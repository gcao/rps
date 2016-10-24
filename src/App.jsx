import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import './App.less';

import ComputerPlayerUI from './components/ComputerPlayerUI';

@observer
class App extends Component {
  render() {
    return (
      <div>
        <ComputerPlayerUI/>
        <DevTools />
      </div>
    );
  }
};

export default App;
