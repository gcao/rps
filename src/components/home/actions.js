export const INITIALIZE = 'homepage.initialize'
export const DESTROY = 'homepage.destroy'

export function initialize() {
  return { type: INITIALIZE }
}

export function destroy() {
  return { type: DESTROY }
}
