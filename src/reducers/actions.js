import { createAction } from 'redux-actions'

export const ADD_REDUCER    = 'ADD_REDUCER'
export const REMOVE_REDUCER = 'REMOVE_REDUCER'

export let addReducer    = createAction(ADD_REDUCER)
export let removeReducer = createAction(REMOVE_REDUCER)
