import IComputerPlayer from '../rps/computer-player/IComputerPlayer'
import MainPlayer from '../rps/computer-player/MainPlayer'

let computerPlayer: IComputerPlayer

export function setComputerPlayer(implementation?: string) {
  computerPlayer = new MainPlayer()
}

export function getComputerPlayer(): IComputerPlayer {
  if (!computerPlayer) {
    setComputerPlayer()
  }
  return computerPlayer
}
