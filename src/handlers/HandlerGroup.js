export default class HandlerGroup {
  constructor(middleware) {
    this.middleware = middleware
    this.children   = []
  }

  add(child) {
    if (this.children.indexOf(child) < 0) {
      this.children.push(child)
    }
  }

  remove(child) {
    let index = this.children.indexOf(child)
    if (index >= 0) {
      this.children.splice(index, 1)
    }
  }

  handle(action, ...args) {
    let result
    let child

    for (var i = 0; i < this.children.length; i++) {
      child  = this.children[i]
      result = child(action, ...args)
      if (result && result.isAbort) {
        break
      }
    }

    return result
  }
}
