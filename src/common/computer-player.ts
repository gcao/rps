import ComputerPlayer from '../rps/computer-player/ComputerPlayer'
import MainPlayer from '../rps/computer-player/MainPlayer'

let computerPlayer: ComputerPlayer

export function setComputerPlayer() {
  computerPlayer = new MainPlayer()
}

export function getComputerPlayer(): ComputerPlayer {
  if (!computerPlayer) {
    setComputerPlayer()
  }
  return computerPlayer
}
