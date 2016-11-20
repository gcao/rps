import * as actions from './actions'

export default function reducers(state, action) {
  switch (action.type) {
    case actions.INITIALIZE:

      return Object.assign({}, state, {
        homepage: {
        }
      })

    case actions.DESTROY:
      return Object.assign({}, state, {
        homepage: undefined
      })

    default:
      return state
  }
}

