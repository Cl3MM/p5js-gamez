export class Laser {
  constructor (opts) {
    this.p = opts.p
    this.pos = this.p.createVector(opts.x, opts.y)
    this.speed = opts.speed
    this.vel = this.p.createVector(0, -4)

    this.w = 2
    this.h = 4
    this.visible = true
  }
  move () {
    this.pos.add(this.vel)
    if (this.pos.y <= 0) this.visible = false
    return this
  }
  show () {
    this.p.push()
    this.p.noStroke()
    this.p.fill(255)
    this.p.rect(this.pos.x, this.pos.y, this.w, this.h)
    this.p.pop()
  }
}
