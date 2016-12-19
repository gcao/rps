export default function replace(state, name, payload) {
  return Object.assign({}, state, {
    [name]: payload
  })
}
