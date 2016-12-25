import HandlerGroup from './HandlerGroup'

let handlers

const middleware = store => next => {
  // TODO this will not work if middlewares change during execution
  middleware.next = action => next(action)

  return action => {
    let result = handlers.handle(action)

    if (result && result.isAbort) {
      // TODO cleanup or anything else?
    } else {
      return next(action)
    }
  }
}

middleware.handlers = handlers = new HandlerGroup(middleware)

export let abort = () => ({isAbort: true})

export default middleware

export const ADD_HANDLER    = 'middleware.add_handler'
export const REMOVE_HANDLER = 'middleware.remove_handler'

export let addHandler    = handler => ({ type: ADD_HANDLER,    payload: handler })
export let removeHandler = handler => ({ type: REMOVE_HANDLER, payload: handler })
