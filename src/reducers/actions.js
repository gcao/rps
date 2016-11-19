export const ADD_REDUCER = 'ADD_REDUCER'
export const REMOVE_REDUCER = 'REMOVE_REDUCER'

export function addReducer(reducer) {
  return {
    type: ADD_REDUCER,
    reducer,
  }
}

export function removeReducer(reducer) {
  return {
    type: REMOVE_REDUCER,
    reducer,
  }
}

