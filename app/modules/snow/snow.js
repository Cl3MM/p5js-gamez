export class SnowBall {
  constructor (opts) {
    this.p = opts.p
    this.x = opts.x || this.p.random(0, this.p.windowWidth)
    this.y = opts.y || this.p.random(-100, -20)
    this.z = this.p.random(0, 10)
    this.r = opts.r || this.p.map(this.z, 0, 10, 1, 12)
    this.opacity = this.p.map(this.z, 0, 10, 0, 1)
    this.fill = `rgba(255, 255, 255, ${this.opacity})`
    this.speed = this.p.map(this.z, 0, 10, 1, 15)
  }
  draw () {
    this.p.noStroke()
    this.p.fill(this.fill)
    this.p.ellipse(this.x, this.y, this.r * 2, this.r * 2)
  }
  move () {
    this.y += this.speed
    // this.speed += this.speed * 0.005
    if (this.y > this.p.windowHeight) {
      this.z = this.p.random(0, 10)
      this.y = this.p.random(-500, -50)
      this.r = this.p.map(this.z, 0, 10, 1, 12)
      this.opacity = this.p.map(this.z, 0, 10, 0, 1)
      this.fill = `rgba(255, 255, 255, ${this.opacity})`
      this.speed = this.p.map(this.z, 0, 10, 1, 15)
    }
  }
}

export class SnowBalls {
  constructor (p) {
    this.p = p
    this.balls = []
    for (let i = 0; i < 500; i++) {
      this.balls.push(new SnowBall({p: p}))
    }
  }
  setup () {
    this.p.colorMode(this.p.HSB)
    this.p.background('rgb(28, 12, 82)')
    this.p.createCanvas(this.p.windowWidth, this.p.windowHeight)
  }
  draw () {
    this.balls.forEach((b) => {
      b.move()
      b.draw()
    })
  }
}
