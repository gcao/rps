export default class ReducerGroup {
  constructor() {
    this.children = []
    this.handle = this.handle.bind(this)
  }

  add(reducer) {
    if (this.children.indexOf(reducer) >= 0) {
      return
    }

    this.children.push(reducer)
  }

  remove(reducer) {
    let index = this.children.indexOf(reducer)

    if (index >= 0) {
      this.children.splice(index, 1)
    }
  }

  handle(state, action) {
    this.children.forEach(reducer => {
      state = reducer(state, action)
    })

    return state
  }
}

