export const INITIALIZE = 'home.initialize'
export const DESTROY    = 'home.destroy'

export function initialize() {
  return { type: INITIALIZE }
}

export function destroy() {
  return { type: DESTROY }
}
