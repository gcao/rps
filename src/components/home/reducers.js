import * as actions from './actions'

export default function reducers(state, {type, payload}) {
  switch (type) {
    case actions.INITIALIZE:
      return replace(state, {})

    case actions.START:
      return update(state, {started: true})

    case actions.DESTROY:
      return Object.assign({}, state, {
        home: undefined
      })

    default:
      return state
  }
}

function replace(state, payload) {
  return Object.assign({}, state, {
    home: payload
  })
}

function update(state, payload) {
  return Object.assign({}, state, {
    home: Object.assign({}, state.home, payload)
  })
}

