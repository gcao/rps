import middleware from './middleware'
import HandlerGroup from './HandlerGroup'

export { middleware, HandlerGroup }

export function addHandler(...args) {
  let handler = args.pop()

  if (args.length > 0) {
    let wrapper = function(action, ...rest) {
      if (args.indexOf(action.type) >= 0) {
        return handler(action, ...rest)
      }
    }
    middleware.rootHandler.add(wrapper)
    return wrapper
  } else {
    middleware.rootHandler.add(handler)
    return handler
  }
}

export function removeHandler(handler) {
  middleware.rootHandler.remove(handler)
}

export function removeHandlers(handlers) {
  handlers.forEach(handler => removeHandler(handler))
}

export function prepareHandlers(map) {
  let handlers = []

  function register() {
    foreach(map, function(name, handler) {
      handlers.push(addHandler(name, handler))
    })
  }

  function deregister() {
    removeHandlers(handlers)
  }

  return {
    register, deregister
  }
}