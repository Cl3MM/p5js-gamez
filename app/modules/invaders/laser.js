import { Particle } from './particle'

export class Laser {
  constructor (opts) {
    this.p = opts.p
    this.gravity = opts.gravity
    this.pos = this.p.createVector(opts.x, opts.y)
    this.speed = opts.speed
    this.vel = this.p.createVector(0, -this.speed)

    this.particles = []
    this.w = 2
    this.h = 4
    this.visible = true
    this.done = false
  }
  move () {
    this.pos.add(this.vel)
    if (this.pos.y <= 0) this.visible = false
    return this
  }
  hide () {
    this.visible = false
    this.done = true
  }
  explode () {
    this.done = true
    let max = Math.floor(Math.random() * 80) + 40
    for (var i = 0; i < max; i++) {
      this.particles.push(new Particle({
        p: this.p,
        x: this.pos.x,
        y: this.pos.y
      }))
    }
  }
  showExplosion () {
    for (var i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update(this.gravity).show()
      if (this.particles[i].done()) {
        this.particles.splice(i, 1)
      }
    }
    if (this.particles.length === 0) {
      this.visible = false
    }
  }
  show () {
    if (this.done) {
      this.showExplosion()
    } else {
      if (this.pos.y <= 0) this.visible = false
      this.pos.add(this.vel)
      this.p.push()
      this.p.rect(this.pos.x, this.pos.y, this.w, this.h)
      this.p.pop()
    }
  }
}
