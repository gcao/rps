export class ReducerGroup {
  constructor() {
    this.children = []
  }

  add(reducer) {
    if (this.children.indexOf(reducer) >= 0) {
      return
    }

    this.children.push(reducer)
  }

  remove(reducer) {
    this.children.remove(reducer)
  }

  handle(state, action) {
    this.children.forEach(reducer => {
      state = reducer(state, action)
    })

    return state
  }
}

export const rootReducers = new ReducerGroup

export default function(state, action) {
  return rootReducers.handle(state, action)
}

