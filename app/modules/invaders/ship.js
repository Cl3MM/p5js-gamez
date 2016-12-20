import { Dart } from './dart'

export class Ship {
  constructor (p) {
    this.p = p
    this.h = 25
    this.w = 5
    this.x = p.windowWidth / 2
    this.y = p.windowHeight / 3 * 2
    this.dirx = 0
    this.diry = 0
    this.speedx = 4
    this.speedy = 6
    this.darts = []
    this.p.keyPressed = this.handleKeyPressed.bind(this)
    this.p.keyReleased = this.handleKeyReleased.bind(this)
  }
  handleKeyPressed () {
    if (this.p.keyCode === this.p.LEFT_ARROW) {
      this.dirx = -1
    }
    if (this.p.keyCode === this.p.RIGHT_ARROW) {
      this.dirx = 1
    }
    if (this.p.keyCode === this.p.UP_ARROW) {
      this.diry = -1
    }
    if (this.p.keyCode === this.p.DOWN_ARROW) {
      this.diry = 1
    }
    if (this.p.keyCode === 32) {
      this.shoot()
    }
  }
  handleKeyReleased () {
    this.dirx = 0
    this.diry = 0
  }
  shoot () {
    this.darts.push(new Dart({
      p: this.p,
      x: this.x,
      y: this.y
    }))
  }
  removeHiddenDarts () {
    for (let i = this.darts.length - 1; i >= 0; i--) {
      if (!this.darts[i].visible) {
        this.darts.splice(i, 1)
      }
    }
  }
  update () {
    this.removeHiddenDarts()
    this.x += this.dirx * this.speedx
    this.x = this.p.constrain(this.x, 0, this.p.windowWidth - this.w)
    this.y += this.diry * this.speedy
    this.y = this.p.constrain(this.y, 0, this.p.windowHeight - this.h)
    return this
  }
  show () {
    this.p.push()
    this.p.fill(255)
    this.p.noStroke()
    this.p.rect(this.x, this.y, this.w, this.h)
    this.p.pop()
    this.darts.forEach(d => d.move().show())
    return this
  }
}
