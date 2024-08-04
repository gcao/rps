/*global localStorage */

import IComputerPlayer from '../rps/computer-player/IComputerPlayer'
import DqnPlayer from '../rps/computer-player/DqnPlayer'
import { PLAYER_NAME as DummyPlayerName } from '../rps/computer-player/DummyPlayer'
import DummyPlayer from '../rps/computer-player/DummyPlayer'
import { PLAYER_NAME as ConvNetPlayerName } from '../rps/computer-player/ConvNetPlayer'
import ConvNetPlayer from '../rps/computer-player/ConvNetPlayer'

let computerPlayer: IComputerPlayer

export function setComputerPlayer() {
  let opponent = localStorage.getItem('opponent')

  if (opponent === DummyPlayerName) {
    computerPlayer = new DummyPlayer()
  } else if (opponent === ConvNetPlayerName) {
    computerPlayer = new ConvNetPlayer()
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
