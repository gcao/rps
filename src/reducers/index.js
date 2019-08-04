import ReducerGroup from './ReducerGroup'
import replace from './replace'
import update  from './update'

export { replace, update }

const defaultReducers = new ReducerGroup()

export function addReducer(reducer) {
  defaultReducers.add(reducer)
}

export function removeReducer(reducer) {
  defaultReducers.remove(reducer)
}

//export function addReducerFor(actionType, reducer) {
//  defaultReducers.add(function(state: any, action: Action) {
//    if (action.type === actionType) {
//      return reducer(state, action)
//    } else {
//      return state
//    }
//  })
//}

export function addReducerFor(mappings) {
  defaultReducers.add(function(state, action) {
    for (var key in mappings) {
      var reducer = mappings[key]
      if (action.type === key) {
        return reducer(state, action)
      }
    }
    return state
  })
}

export default function(state, action) {
  return defaultReducers.handle(state, action)
}
