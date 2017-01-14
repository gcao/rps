import Move from '../Move'

interface ComputerPlayer {
  predict(input: any): any
  train(move: Move): any
}

export default ComputerPlayer