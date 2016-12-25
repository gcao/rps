import { createStore, applyMiddleware, compose } from 'redux'
import { routerReducer } from 'react-router-redux'
import { middleware } from './handlers'
import reducers from './reducers'

let rootReducers = function(state, action) {
  // Do not proceed if action and action type are not passed
  if (!action && !action.type) {
    return state
  }

  let updatedState = reducers(state, action)
  return Object.assign({}, updatedState, {
    routing: routerReducer(state.routing, action),
  })
}
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    actionsBlacklist: ['ADD_REDUCER', 'REMOVE_REDUCER'],
  }) ||
  compose

export default function(initialState) {
  return createStore(
    rootReducers,
    initialState,
    composeEnhancers(applyMiddleware(middleware))
  )
}
