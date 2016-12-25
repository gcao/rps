export default class HandlerGroup {
  constructor(middleware, children) {
    this.middleware = middleware
    this.children = children || []
  }

  add(child) {
    if (this.children.indexOf(child) < 0) {
      this.children.push(child)
    }
  }

  remove(child) {
    this.children.remove(child)
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
