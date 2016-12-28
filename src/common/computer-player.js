import { ComputerPlayerProxy } from '../rps/computer-player'

let computerPlayer

export function setComputerPlayer(implementation) {
  implementation = implementation || 'DefaultComputerPlayer'
  if (computerPlayer && computerPlayer.implementation === implementation) {
    return
  }

  computerPlayer = new ComputerPlayerProxy(window[implementation])
}

export function getComputerPlayer() {
  return computerPlayer
}
