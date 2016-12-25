export HandlerGroup from './HandlerGroup'
import GroupHandler from './GroupHandler'
import middleware from './middleware'
export middleware, { addHandler, removeHandler } from './middleware'

middleware.handlers.add(new GroupHandler(middleware.handlers))
