import ComputerPlayerProxy from './ComputerPlayerProxy'
import ComputerPlayer1 from './ComputerPlayer1'
import ComputerPlayer2 from './ComputerPlayer2'

const DefaultComputerPlayer = ComputerPlayer1

export { ComputerPlayerProxy, DefaultComputerPlayer, ComputerPlayer1, ComputerPlayer2 }

window.DefaultComputerPlayer = DefaultComputerPlayer
window.ComputerPlayer1 = ComputerPlayer1
window.ComputerPlayer2 = ComputerPlayer2

// computer player interface:
//   Methods:
//     predict(state): return a json object with prediction etc
//     train(state, move):
