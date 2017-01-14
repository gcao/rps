import GroupHandler from './GroupHandler'
import middleware from './middleware'

import HandlerGroup from './HandlerGroup'
export { middleware, HandlerGroup }

let handleGroupActions = new GroupHandler(middleware.handlers).handle
middleware.handlers.add(handleGroupActions)

export function addHandler(...args) {
  let handler = args.pop()

  if (args.length > 0) {
    let wrapper = function(action, ...rest) {
      if (args.indexOf(action.type) >= 0) {
        return handler(action, ...rest)
      }
    }
    middleware.handlers.add(wrapper)
    return wrapper
  } else {
    middleware.handlers.add(handler)
    return handler
  }
}

export function removeHandler(handler) {
  middleware.handlers.remove(handler)
}

export function removeHandlers(handlers) {
  handlers.forEach(handler => removeHandler(handler))
}
