export class Enemy {
  constructor (p) {
    this.p = p
    let x = Math.floor(Math.random() * this.p.windowWidth)
    let y = -Math.floor(Math.random() * 200) + 20
    this.pos = this.p.createVector(x, y)
    this.vel = this.p.createVector()
  }
  update () {}
  show () {
    this.p.pop()
    this.p.rectangle()
    this.p.push()
  }
}
