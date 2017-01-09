import { Laser } from './laser'

export class Ship {
  constructor (opts) {
    this.p = opts.p
    this.lives = opts.lives || 5
    this.maxLives = this.lives
    this.gravity = opts.gravity
    this.revive = false
    this.h = 25
    this.w = 25
    this.x = this.p.windowWidth / 2
    this.y = this.p.windowHeight / 3 * 2
    this.pos = this.p.createVector(this.x, this.y)
    this.vel = this.p.createVector(0, -2)
    this.acc = this.p.createVector(0, 0)
    this.dirx = 0
    this.diry = 0
    this.isThrusting = false
    this.speedx = 10
    this.speedy = 10
    this.lasers = []
    this.p.keyPressed = this.handleKeyPressed.bind(this)
    this.p.keyReleased = this.handleKeyReleased.bind(this)
    this.frames = 30
    this.particles = []
    return this
  }
  handleKeyPressed () {
    this.isThrusting = true
    switch (this.p.keyCode) {
      case this.p.LEFT_ARROW:
        // this.dirx = -1
        this.applyForce(this.p.createVector(-this.speedx, 0))
        break
      case this.p.RIGHT_ARROW:
        // this.dirx = 1
        this.applyForce(this.p.createVector(this.speedx, 0))
        break
      case this.p.UP_ARROW:
        // this.diry = -1
        this.applyForce(this.p.createVector(0, -this.speedy))
        break
      case this.p.DOWN_ARROW:
        // this.diry = 1
        this.applyForce(this.p.createVector(0, this.speedy))
        break
      case 32:
        this.shoot()
    }
  }
  applyForce (force) {
    this.acc = force
  }
  handleKeyReleased () {
    this.isThrusting = false
  // this.dirx = 0
  // this.diry = 0
  }
  shoot () {
    this.lasers.push(new Laser({
      p: this.p,
      gravity: this.gravity,
      speed: 10,
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

  checkBonus (bonus) {
    if (bonus.hit(this.pos.x, this.pos.y, this.h)) {
      bonus.alive = false
      this.lives++
      if (bonus.type === 'life') {
        this.lives += bonus.bonus().life
      }
    }
    return bonus
  }

  checkEnemiesHit (enemies) {
    for (let i = enemies.length - 1; i >= 0; i--) {
      if (enemies[i].hit(this.pos.x, this.pos.y, this.w) && this.frames === 0) {
        this.frames += 40
        this.lives--
      }
      for (let j = this.lasers.length - 1; j >= 0; j--) {
        let laser = this.lasers[j]
        if (enemies[i].hit(laser.pos.x, laser.pos.y, laser.w)) {
          enemies[i].life--
          if (enemies[i].dead()) {
            laser.explode()
          } else {
            laser.hide()
          }
        }
      }
    }
  }

  update (enemies) {
    this.checkEnemiesHit(enemies)
    this.removeHiddenDarts()
    // this.x += this.dirx * this.speedx
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    this.acc.mult(0)
    // this.y += this.diry * this.speedy
    this.constrain()
    return this
  }
  dead () {
    return this.lives < 1
  }
  show () {
    this.frame
    this.p.fill('rgb(255, 145, 0)')
    this.lasers.forEach(l => l.show())

    this.p.push()
    this.p.translate(this.pos.x, this.pos.y)

    if (this.frames > 0) {
      let h = Math.floor(Math.random() * 100)
      let s = Math.floor(Math.random() * 100)
      let v = Math.floor(Math.random() * 100)
      this.p.fill(h, s, v)
      this.frames--
    } else {
      this.p.fill('rgb(161, 219, 65)')
    }
    this.p.stroke(255)
    // this.p.rect(this.x, this.y, this.w, this.h)
    this.p.triangle(-this.h, this.h, this.h, this.h, 0, -this.h)
    this.p.pop()

    return this
  }
  constrain () {
    if (this.pos.x > this.p.windowWidth - this.w) {
      this.vel.mult(-0.1)
      this.pos.x = this.p.windowWidth - this.w
    }
    if (this.pos.x <= this.w) {
      this.vel.mult(-0.1)
      this.pos.x = this.w
    }

    if (this.pos.y > this.p.windowHeight - this.h) {
      this.vel.mult(-0.1)
      this.pos.y = this.p.windowHeight - this.h
    }
    if (this.pos.y <= this.h) {
      this.vel.mult(-0.1)
      this.pos.y = this.h
    }
  }
}
