/*global localStorage */

import IComputerPlayer from '../rps/computer-player/IComputerPlayer'
import DqnPlayer from '../rps/computer-player/DqnPlayer'
import DummyPlayer from '../rps/computer-player/DummyPlayer'

let computerPlayer: IComputerPlayer

export function setComputerPlayer() {
  let dummyPlayer = new DummyPlayer()

  if (localStorage.getItem('opponent') === dummyPlayer.name) {
    computerPlayer = dummyPlayer
  } else {
    computerPlayer = new DqnPlayer()
  }
}

export function getComputerPlayer(): IComputerPlayer {
  if (!computerPlayer) {
    setComputerPlayer()
  }
  return computerPlayer
}
