import { Ship } from './ship'
import { World } from './world'

export class Game {
  constructor (p) {
    this.p = p
    this.ship = new Ship(p)
    this.world = new World(p)
  }
  setup () {
    this.p.colorMode(this.p.HSB)
    this.p.background('rgb(28, 12, 82)')
    this.p.createCanvas(this.p.windowWidth, this.p.windowHeight)
  }
  draw () {
    this.world.show()
    this.ship.update().show()
  }
}
