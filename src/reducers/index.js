import ReducerGroup from './ReducerGroup'
import { ADD_REDUCER, REMOVE_REDUCER, addReducer, removeReducer } from './actions'
export { addReducer, removeReducer }

const defaultReducers = new ReducerGroup()

export default function(state, action) {
  if (action.type === ADD_REDUCER) {
    defaultReducers.add(action.reducer)
  } else if (action.type === REMOVE_REDUCER) {
    defaultReducers.remove(action.reducer)
  }

  return defaultReducers.handle(state, action)
}
