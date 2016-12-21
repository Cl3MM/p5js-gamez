export class Enemy {
  constructor (p, x, y, r, life, speed) {
    this.p = p
    this.r = r * 2
    this.life = life || 1
    this.score = Math.floor(this.p.map(this.life, 1, 10, 10, 100))
    let color = Math.floor(this.p.map(this.life, 1, 10, 100, 0))
    this.color = [color, 100, 100]
    this.pos = this.p.createVector(x, y)
    this.vel = this.p.createVector(0, this.p.map(this.life, 1, 10, 2, 8))
    this.shape = Math.random() >= 0.5 ? this.skull() : this.invader()
  }

  skull () {
    return [
      [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1]
    ]
  }

  invader () {
    return [
      [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0],
      [0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0]
    ]
  }
  drawShape () {
    let px = Math.floor(this.r / 11)
    this.p.translate(this.pos.x, this.pos.y)
    this.p.rotate(90)
    for (let i = 0; i < this.shape.length; i++) {
      let row = this.shape[i]
      for (let j = 0; j < row.length; j++) {
        if (this.shape[i][j] === 1) {
          this.p.rect(i * px, j * px, px, px)
        }
      }
    }
  }

  dead () {
    return this.life <= 0
  }

  hit (x, y, r) {
    return this.p.dist(x, y, this.pos.x, this.pos.y) <= r + this.r
  }

  update (lasers) {
    this.constrain()
    this.pos.add(this.vel)
    return this
  }

  show () {
    this.p.fill(this.color)
    this.p.stroke(this.color)
    // this.p.ellipse(this.pos.x, this.pos.y, this.r * 2)
    this.p.push()
    this.drawShape()
    this.p.pop()
  }

  constrain () {
    if (this.pos.y >= this.p.windowHeight + this.r) {
      this.pos.y = -Math.floor(Math.random() * 100) + 20
    }

    if (this.pos.x > (this.p.windowWidth - this.r) || this.pos.x < this.r) {
      this.pos.x = Math.floor(Math.random() * this.p.windowWidth) + this.r
    }
  }
}
