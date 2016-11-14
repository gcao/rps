import ReducerGroup from './ReducerGroup'

export { ReducerGroup }
export const defaultReducers = new ReducerGroup()

export default function(state, action) {
  return defaultReducers.handle(state, action)
}
