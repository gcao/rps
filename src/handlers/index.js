import GroupHandler from './GroupHandler'
import middleware from './middleware'

export HandlerGroup from './HandlerGroup'
export { middleware }

let handleGroupActions = new GroupHandler(middleware.handlers).handle
middleware.handlers.add(handleGroupActions)

export function addHandler(handler) {
  middleware.handlers.add(handler)
}

export function removeHandler(handler) {
  middleware.handlers.remove(handler)
}
