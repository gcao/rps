export const INITIALIZE = 'computerPlayer.initialize'
export const PLAY       = 'computerPlayer.play'

export function initialize() {
  return { type: INITIALIZE }
}

export function play(move) {
  return {
    type: PLAY,
    move,
  }
}
