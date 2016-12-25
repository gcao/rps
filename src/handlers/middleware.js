import HandlerGroup from './HandlerGroup'

const middleware = store => next => {
  // TODO this will not work if middlewares change during execution
  middleware.next = action => next(action)

  return action => {
    let options = {
      store
    }
    let result = middleware.handlers.handle(action, options)

    if (result && result.isAbort) {
      // TODO cleanup or anything else?
    } else {
      return next(action)
    }
  }
}

middleware.handlers = new HandlerGroup(middleware)

export let abort = () => ({isAbort: true})

export default middleware
