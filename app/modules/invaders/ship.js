import { Laser } from './laser'

export class Ship {
  constructor (p) {
    this.p = p
    this.h = 25
    this.w = 25
    this.x = p.windowWidth / 2
    this.y = p.windowHeight / 3 * 2
    this.pos = this.p.createVector(this.x, this.y)
    this.vel = this.p.createVector(0, -2)
    this.acc = this.p.createVector(0, 0)
    this.dirx = 0
    this.diry = 0
    this.isThrusting = false
    this.speedx = 4
    this.speedy = 6
    this.lasers = []
    this.p.keyPressed = this.handleKeyPressed.bind(this)
    this.p.keyReleased = this.handleKeyReleased.bind(this)
  }
  handleKeyPressed () {
    this.isThrusting = true
    switch (this.p.keyCode) {
      case this.p.LEFT_ARROW:
        // this.dirx = -1
        this.updateVelocity(this.p.createVector(-4, 0))
        break
      case this.p.RIGHT_ARROW:
        // this.dirx = 1
        this.updateVelocity(this.p.createVector(4, 0))
        break
      case this.p.UP_ARROW:
        // this.diry = -1
        this.updateVelocity(this.p.createVector(0, -2))
        break
      case this.p.DOWN_ARROW:
        // this.diry = 1
        this.updateVelocity(this.p.createVector(0, 2))
        break
      case 32:
        this.shoot()
    }
  }
  updateVelocity (force) {
    this.vel.add(force)
    this.vel.mult(0.95)
  }
  handleKeyReleased () {
    this.isThrusting = false
  // this.dirx = 0
  // this.diry = 0
  }
  shoot () {
    this.lasers.push(new Laser({
      p: this.p,
      x: this.pos.x,
      y: this.pos.y
    }))
  }
  removeHiddenDarts () {
    for (let i = this.lasers.length - 1; i >= 0; i--) {
      if (!this.lasers[i].visible) {
        this.lasers.splice(i, 1)
      }
    }
  }
  update () {
    this.removeHiddenDarts()
    // this.x += this.dirx * this.speedx
    this.pos.add(this.vel)
    this.pos.x = this.p.constrain(this.pos.x, 0, this.p.windowWidth - this.w)
    // this.y += this.diry * this.speedy
    this.pos.y = this.p.constrain(this.pos.y, 0, this.p.windowHeight - this.h)
    return this
  }
  show () {
    this.p.push()
    this.p.translate(this.pos.x, this.pos.y)
    this.p.fill(255)
    this.p.noStroke()
    // this.p.rect(this.x, this.y, this.w, this.h)
    this.p.triangle(-this.h, this.h, this.h, this.h, 0, -this.h)
    this.p.pop()
    this.lasers.forEach(d => d.move().show())
    return this
  }
}
