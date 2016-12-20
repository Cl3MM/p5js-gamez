export class Dart {
  constructor (opts) {
    this.p = opts.p
    this.x = opts.x
    this.y = opts.y
    this.w = 2
    this.h = 4
    this.speed = opts.speed
    this.visible = true
  }
  move () {
    this.y -= 5
    if (this.y <= 0) this.visible = false
    return this
  }
  show () {
    this.p.push()
    this.p.noStroke()
    this.p.fill(255)
    this.p.rect(this.x, this.y, this.w, this.h)
    this.p.pop()
  }
}
