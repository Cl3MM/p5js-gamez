export class World {
  constructor (p) {
    this.p = p
    this.stars = []
    for (var i = 0; i < this.p.windowWidth / 5; i++) {
      this.stars.push(new Star(p))
    }
  }

  show () {
    this.stars.forEach(s => s.update().show())
  }
}

class Star {
  constructor (p) {
    this.p = p
    this.x = Math.floor(Math.random() * this.p.windowWidth)
    this.y = -Math.floor(Math.random() * 200) + 20
    this.z = Math.floor(Math.random() * 100)
    this.r = this.p.map(this.z, 0, 100, 1, 8)
    this.speed = this.p.map(this.z, 0, 100, 2, 15)
    this.opacity = this.p.map(this.z, 0, 100, 0.1, 0.6)
  }
  update () {
    this.y += this.speed
    if (this.y > this.p.windowHeight) {
      this.x = Math.floor(Math.random() * this.p.windowWidth)
      this.y = -Math.floor(Math.random() * 200) + 20
      this.z = Math.floor(Math.random() * 100)
      this.speed = this.p.map(this.z, 0, 100, 2, 20)
      this.opacity = this.p.map(this.z, 0, 100, 0.1, 0.6)
    }
    return this
  }
  show () {
    this.p.pop()
    this.p.noStroke()
    this.p.fill(`rgba(250, 250, 250, ${this.opacity})`)
    this.p.ellipse(this.x, this.y, this.r)
    this.p.push()
  }
}
