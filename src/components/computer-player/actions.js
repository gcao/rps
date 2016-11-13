const PLAY = 'PLAY'

export function play(move) {
  return {
    type: PLAY,
    move
  }
}
