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
    return this.handle_(action, 0, ...args)
  }

  handle_(action, startIndex, ...args) {
    let result
    let child

    for (var i = startIndex; i < this.children.length; i++) {
      child  = this.children[i]
      result = child(action, ...args)
      if (result && result.isAbort) {
        break
      } else if (result && typeof result.then === 'function') {
        result.then(action => this.handle_(action, i + 1, ...args))
        break
      }
    }

    return result
  }
}
