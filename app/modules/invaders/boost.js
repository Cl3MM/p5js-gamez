export class Boost {
  constructor (p, x, y, r, speed, bonus, type) {
    this.p = p
    this.r = r * 2
    this.pos = this.p.createVector(x, y)
    this.vel = this.p.createVector(0, speed)
    this._color = this.color()
    this._shape = this.shape()
    this._bonus = this.bonus(bonus)
    this._type = this.type(type)
    this.alive = true
  }

  type (val) {
    if (val) this._type = val
    return this._type
  }
  color (color) {
    if (color) {
      this._color = color
    } else {
      this._color = [0, 100, 100]
    }

    return this._color
  }
  bonus (val) {
    if (val) {
      this._bonus = val
    }
    return this._bonus
  }
  shape (val) {
    if (val) {
      this._shape = val
    } else {
      this._shape = [
        [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
      ]
    }
    return this._shape
  }

  drawShape () {
    let px = Math.floor(this.r / 11)
    this.p.translate(this.pos.x, this.pos.y)
    this.p.rotate(90)
    for (let i = 0; i < this._shape.length; i++) {
      let row = this._shape[i]
      for (let j = 0; j < row.length; j++) {
        if (this._shape[i][j] === 1) {
          this.p.rect(i * px, j * px, px, px)
        }
      }
    }
  }

  hit (x, y, r) {
    return this.p.dist(x, y, this.pos.x, this.pos.y) <= r + this.r
  }

  update () {
    this.constrain()
    this.pos.add(this.vel)
    return this
  }

  show () {
    this.p.fill(this._color)
    this.p.stroke(this._color)
    // this.p.ellipse(this.pos.x, this.pos.y, this.r * 2)
    this.p.push()
    this.drawShape()
    this.p.pop()
  }

  constrain () {
    if (this.pos.y >= this.p.windowHeight + this.r) {
      this.alive = false
    }

    if (this.pos.x > (this.p.windowWidth - this.r) || this.pos.x < this.r) {
      this.pos.x = Math.floor(Math.random() * this.p.windowWidth) + this.r
    }
  }
}
