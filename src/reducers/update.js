export default function update(state, name, payload) {
  if (arguments.length === 2) {
    payload = name
    return Object.assign({}, state, payload)
  } else if (arguments.length === 3) {
    return Object.assign({}, state, {
      [name]: Object.assign({}, state[name], payload)
    })
  } else {
    return state
  }
}
