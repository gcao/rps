import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers';
import App from './App';

const initialState = {
  gameHistory: [],
  ui: {},
}

const store = createStore(reducers, initialState);

function _render() {
    render((
        <Provider store={store}>
            <App/>
        </Provider>
    ), document.getElementById('root'));
}

_render();

store.subscribe(_render);

