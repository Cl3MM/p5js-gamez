import p5 from 'p5'

export class Particle {
  constructor (opts) {
    this.p = opts.p
    this.pos = opts.p.createVector(opts.x, opts.y)
    this.vel = p5.Vector.random2D()
    this.vel.mult(this.p.random(15, 35))
    // this.vel = opts.p.createVector(opts.p.random(2, 10))
    this.acc = opts.p.createVector(0, -3)
    this.lifespan = 1
    this.h = Math.floor(Math.random() * 100)
    this.s = Math.floor(Math.random() * 100)
    this.v = Math.floor(Math.random() * 100)
    this.size = Math.floor(Math.random() * 3) + 1
  }

  applyForce (force) {
    this.acc.add(force)
    this.vel.mult(0.8)
  }
  done () {
    return this.lifespan < 0
  }
  update (gravity) {
    this.lifespan -= 0.05
    this.applyForce(this.p.createVector(0, -Math.floor(Math.random() * 2)))
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    this.acc.mult(0)
    return this
  }
  show () {
    this.p.push()
    this.p.strokeWeight(this.size)
    this.p.stroke(this.h, this.s, this.v, this.lifespan)
    this.p.noFill()
    this.p.point(this.pos.x, this.pos.y)
    this.p.pop()
  }
}
