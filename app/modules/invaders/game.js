import { Ship } from './ship'
import { World } from './world'
import { Enemy } from './enemy'
import { Hud } from './hud'

export class Game {
  constructor (p) {
    this.p = p
    this.gravity = 1
    this.ship = new Ship({p: p, gravity: this.gravity})
    this.world = new World(p)
    this.invaders = []
    for (var i = 0; i < 6; i++) {
      this.invaders.push(new Enemy(this.p, Math.floor(Math.random() * this.p.windowHeight) + 22, -(Math.floor(Math.random() * 200) + 50), 22))
    }
    this.hud = new Hud(this.p, this.ship)
  }
  setup () {
    this.p.colorMode(this.p.HSB)
    this.p.angleMode(this.p.DEGREES)
    this.p.background('rgb(28, 12, 82)')
    this.p.createCanvas(this.p.windowWidth, this.p.windowHeight)
  }
  heartbeat () {
    setInterval(() => {
      console.log('heartbeat')
      console.log(this.ship)
      console.log(this.invaders)
      console.log(this.hud)
      console.log(this.world)
    }, 10 * 1000)
  }
  draw () {
    this.world.show()
    if (!this.ship.dead()) {
      for (let i = this.invaders.length - 1; i >= 0; i--) {
        if (this.invaders[i].dead()) {
          this.hud.updateScore(this.invaders[i])
          this.invaders.splice(i, 1)
        } else {
          this.invaders[i].update().show()
        }
      }
      if (this.invaders.length < 5) {
        let life = Math.floor(this.p.map(this.hud.kills, 0, 100, 1, 10))
        if (Math.random() > 0.5) {
          this.invaders.push(new Enemy(
            this.p,
            Math.floor(Math.random() * this.p.windowHeight) + 22,
            -(Math.floor(Math.random() * 200) + 50),
            22, life
          ))
        }
      }
      this.ship.update(this.invaders).show()
    }
    if (this.ship.revive) {
      this.ship = new Ship({p: this.p, gravity: this.gravity})
    }
    this.hud.render(this.ship)
  }
}
