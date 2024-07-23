import IComputerPlayer from '../rps/computer-player/IComputerPlayer'
import MainPlayer from '../rps/computer-player/MainPlayer'
import DqnPlayer from '../rps/computer-player/DqnPlayer'

let computerPlayer: IComputerPlayer

export function setComputerPlayer(implementation?: string) {
  // computerPlayer = new MainPlayer()
  computerPlayer = new DqnPlayer()
}

export function getComputerPlayer(): IComputerPlayer {
  if (!computerPlayer) {
    setComputerPlayer()
  }
  return computerPlayer
}
