export default function ComputerPlayerProxy(playerClass, options) {
  this.player = new playerClass(options)

  this.predict = function(state) {
    return this.player.predict(state)
  }

  this.train = function(state, move) {
    return this.player.train(state, move)
  }
}
