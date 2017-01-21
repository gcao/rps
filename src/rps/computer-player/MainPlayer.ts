import Move from '../Move'
import ConvNetPlayer from './ConvNetPlayer'
import IComputerPlayer from './IComputerPlayer'
import IdontcarePlayer from './IdontcarePlayer'

export default class MainPlayer implements IComputerPlayer {
  workers: Array<IComputerPlayer>

  constructor(workers?: Array<IComputerPlayer>) {
    this.workers = workers || [
      new ConvNetPlayer(),
      new IdontcarePlayer()
    ]
  }

  public predict(input: any): any {
    return this.workers[0].predict(input)
  }

  public train(input: any, move: Move): any {
    return this.workers[0].train(input, move)
  }
}