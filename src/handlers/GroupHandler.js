import { ADD_HANDLER, REMOVE_HANDLER, abort } from './middleware'

export default class GroupHandler {
  constructor(group) {
    this.group = group
  }

  handle = action => {
    if (action.type === ADD_HANDLER) {
      this.group.add(action.payload)
      return abort()
    } else if (action.type === REMOVE_HANDLER) {
      this.group.remove(action.payload)
      return abort()
    }
  }
}
