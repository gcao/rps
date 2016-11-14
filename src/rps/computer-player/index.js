export ComputerPlayerProxy from './ComputerPlayerProxy'
import ComputerPlayer1 from './ComputerPlayer1'

export var DefaultComputerPlayer = ComputerPlayer1

// computer player interface:
//   Methods:
//     predict(state): return a json object with prediction etc
//     train(state, move):
