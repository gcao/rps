const ADD_REDUCER = 'ADD_REDUCER'
const REMOVE_REDUCER = 'REMOVE_REDUCER'

export const addReducer = (reducer) => {
  return {
    action: ADD_REDUCER,
    reducer,
  }
}

export const removeReducer = (reducer) => {
  return {
    action: REMOVE_REDUCER,
    reducer,
  }
}

