import GroupHandler from './GroupHandler'
import middleware from './middleware'

export HandlerGroup from './HandlerGroup'
export { middleware }

let handleGroupActions = new GroupHandler(middleware.handlers).handle
middleware.handlers.add(handleGroupActions)

export function addHandler(handler, ...actionTypes) {
  if (actionTypes.length > 0) {
    let wrapper = function(action, ...args) {
      if (actionTypes.indexOf(action.type) >= 0) {
        return handler(action, ...args)
      }
    }
    middleware.handlers.add(wrapper)
  } else {
    middleware.handlers.add(handler)
  }
}

export function removeHandler(handler) {
  middleware.handlers.remove(handler)
}
