import { Boost } from './boost'
import { Ship } from './ship'
import { World } from './world'
import { Enemy } from './enemy'
import { Hud } from './hud'

export class Game {
  constructor (p) {
    this.p = p
    this.w = this.p.windowWidth
    this.h = this.p.windowHeight
    // if (this.w < this.this.h) [this.w, this.h] = [this.h, this.w]
    // this.offsetx = this.windowWidth - this.w / 2
    this.gravity = 1
    this.ship = new Ship({
      p: p,
      gravity: this.gravity,
    // offsetx : this.offsetx,
    // width: this.w
    })
    this.world = new World(p)
    this.invaders = []
    this.bonus = []
    this.maxInvaders = this.computeMaxEnemies()
    // for (var i = 0; i < this.maxInvaders; i++) {
    //   this.invaders.push(new Enemy(
    //     this.p,
    //     Math.floor(Math.random() * this.p.windowHeight) + 22,
    //     -(Math.floor(Math.random() * 200) + 50),
    //     22
    //   ))
    // }
    this.hud = new Hud(this.p, this.ship)
  }
  computeMaxEnemies () {
    return Math.floor(Math.random(this.w / 100 / 2) + 5)
  }
  setup () {
    this.p.colorMode(this.p.HSB)
    this.p.angleMode(this.p.DEGREES)
    this.p.background('rgb(28, 12, 82)')
    this.p.createCanvas(this.p.windowWidth, this.p.windowHeight)
    // this.heartbeat()
    this.addInvaders()
  }
  heartbeat () {
    setInterval(() => {
      console.log('heartbeat')
      console.log(this.ship)
      console.log(this.bonus)
      console.log(this.invaders)
      console.log(this.hud)
      console.log(this.world)
    }, 5 * 1000)
  }

  showInvaders () {
    for (let i = this.invaders.length - 1; i >= 0; i--) {
      if (this.invaders[i].dead()) {
        this.hud.updateScore(this.invaders[i])
        this.invaders.splice(i, 1)
      } else {
        this.invaders[i].update().show()
      }
    }
  }
  addInvaders () {
    let life = Math.floor(this.p.map(this.hud.kills, 0, 100, 1, 10))
    let coords = this.invaders.map(i => [i.pos.x, i.pos.y])

    let x = null
    let y = null
    for (var j = this.invaders.length - 1; j < this.maxInvaders; j++) {
      for (let i = 0; i < 100; i++) {
        x = Math.floor(Math.random() * this.p.windowHeight) + 22
        y = -(Math.floor(Math.random() * 200) + 50)
        let hit = coords.some((c) => {
          return this.p.dist(x, y, c[0], c[1]) <= 22
        })
        if (!hit) {
          this.invaders.push(new Enemy(
            this.p,
            x, y,
            22, life
          ))
          coords.push([x, y])
          break
        }
      }
    }
  }

  checkAndAddInvaders () {
    if (Math.random() >= 0.5) this.addInvaders()
  }
  showBonus () {
    for (let i = this.bonus.length - 1; i >= 0; i--) {
      let bonus = this.ship.checkBonus(this.bonus[i])
      if (!bonus.alive) {
        this.bonus.splice(i, 1)
      } else {
        this.bonus[i].update()
        this.bonus[i].show()
      }
    }
  }
  checkBonus () {
    if (this.ship.lives < this.ship.maxLives
      && this.bonus.map(b => b.type()).indexOf('life') === -1) {
      if (Math.random() >= 0.5) return
      let x = Math.floor(Math.random() * this.p.windowHeight) + 22
      let y = -(Math.floor(Math.random() * 200) + 50)
      this.bonus.push(new Boost(this.p, x, y, 22, 1, {life: 1}, 'life'))
    }
  }
  draw () {
    this.world.show()
    if (!this.ship.dead()) {
      this.showBonus()
      this.showInvaders()
      this.checkAndAddInvaders()
      this.checkBonus()
      this.ship.update(this.invaders).show()
    }
    if (this.ship.revive) {
      if (this.hud.restarted()) {
        this.invaders = []
      }
      this.ship = new Ship({p: this.p, gravity: this.gravity})
    }
    this.hud.render(this.ship)
  }
}
