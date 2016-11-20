export const INITIALIZE = 'computerPlayer.initialize'
export const PLAY       = 'computerPlayer.play'

export function initialize(computerPlayer) {
  return {
    type: INITIALIZE,
    computerPlayer,
  }
}

export function play(move) {
  return {
    type: PLAY,
    move,
  }
}
