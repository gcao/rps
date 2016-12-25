import ReducerGroup from './ReducerGroup'

const defaultReducers = new ReducerGroup()

export function addReducer(reducer) {
  defaultReducers.add(reducer)
}

export function removeReducer(reducer) {
  defaultReducers.remove(reducer)
}

export default function(state, action) {
  return defaultReducers.handle(state, action)
}
