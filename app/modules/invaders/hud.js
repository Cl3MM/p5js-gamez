import { Enemy } from './enemy'

export class Hud {
  constructor (p, ship) {
    console.log(ship)
    this.score = 0
    this.p = p
    this.kills = 0
    this.lives = ship.lives
    this.hearts = ship.lives
    this.revive = false
    this.over = false
    return this
  }

  updateScore (enemy) {
    this.kills++
    this.score += enemy.score
  }
  renderContinue () {
    this.p.strokeWeight(4)
    this.p.textSize(80)
    this.p.textAlign(this.p.CENTER, this.p.CENTER)
    this.p.text('GAME OVER', 0, 0, this.p.windowWidth, this.p.windowHeight)
    this.p.fill('rgba(255, 255, 255, 0.3)')
    let btn = this.p.rect(this.p.windowWidth / 2 - 100, this.p.windowHeight / 2 + 100, 200, 80, 5)
    this.p.strokeWeight(2)
    this.p.fill('rgb(244, 122, 55)')
    this.p.textSize(24)
    this.p.text('CONTINUE?', this.p.windowWidth / 2 - 100, this.p.windowHeight / 2 + 100, 200, 80)
    let r = this.p.windowWidth / 4
    let invader = new Enemy(
      this.p,
      this.p.windowWidth - r,
      (this.p.windowWidth / 2 - r) * 0.5,
      r)
    invader.shape = invader.invader()
    invader.color = 'rgb(244, 122, 55)'
    invader.show()
    btn.mouseClicked = () => {
      let x = this.p.mouseX
      let y = this.p.mouseY
      if (x > this.p.windowWidth / 2 - 100 && x < this.p.windowWidth / 2 + 200
        && this.p.windowHeight / 2 + 100 < y && y < this.p.windowHeight / 2 + 180) {
        this.revive = true
      }
    }
  }
  render (ship) {
    this.lives = ship.lives
    this.p.push()
    this.p.textAlign(this.p.RIGHT)
    this.p.textSize(20)
    this.p.stroke('rgb(244, 122, 55)')
    this.p.fill('rgb(244, 122, 55)')
    this.p.text(this.score, this.p.windowWidth - 30, 40)
    for (let i = 0; i < this.hearts; i++) {
      new Heart(this.p, this.lives <= i).render(20 * i, 20)
    }
    if (ship.dead()) {
      this.renderContinue(ship)
    }
    if (this.revive) {
      this.revive = false
      ship.revive = true
    }
    this.p.pop()
  }
}

class Heart {
  constructor (p, dead) {
    this.p = p
    this.dead = dead
    return this
  }
  render (x, y) {
    this.p.push()
    if (this.dead) {
      this.p.fill('rgb(80, 0, 0)')
      this.p.stroke('rgb(80, 0, 0)')
    } else {
      this.p.fill('rgb(244, 122, 55)')
      this.p.stroke('rgb(244, 122, 55)')
    }
    this.p.translate(x, y)
    this.p.scale(0.5)
    this.p.beginShape()
    this.p.vertex(50, 15)
    this.p.bezierVertex(50, -5, 90, 5, 50, 40) // You (Right)
    this.p.vertex(50, 15)
    this.p.bezierVertex(50, -5, 10, 5, 50, 40) // Me (Left)
    this.p.endShape()
    this.p.pop()
  // this.p.image(this.heart, x, y)
  }
}
