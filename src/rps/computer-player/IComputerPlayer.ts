import Move from '../Move'

interface IComputerPlayer {
  predict(input: any): any
  train(input: any, move: Move): any
}

export default IComputerPlayer