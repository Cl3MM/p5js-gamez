let FLAG_T = 0x1 // 0001
let FLAG_R = 0x2 // 0010
let FLAG_B = 0x4 // 0100
let FLAG_L = 0x8 // 1000

export class Cell {
  constructor (i, j, size, cols, rows, w, h, p) {
    this.p = p
    this.i = i
    this.j = j
    this.visited = false
    this.cols = cols
    this.rows = rows
    this.size = size
    this.walls = 0b1111
    this.offsetX = (w - (cols * size)) / 2
    this.offsetY = (h - (rows * size)) / 2
  }

  highlight () {
    this.fill('rgb(255, 82, 170)')
    return this
  }

  neighbour () {
    this.fill('rgb(59, 151, 203)')
    return this
  }
  coords () {
    let w = this.size
    let x = this.i * w + this.offsetX
    let y = this.j * w + this.offsetY
    return [x, y, w]
  }
  draw () {
    this.stroke()
  }
  fill (color) {
    const [x, y, w] = this.coords()
    this.p.noStroke()
    this.p.fill(color)
    this.p.rect(x, y, w, w)
  }
  stroke () {
    const [x, y, w] = this.coords()

    if (this.visited) {
      this.p.noStroke()
      this.p.fill('rgb(231, 100, 195)')
      this.p.rect(x, y, w, w)
    }
    this.p.noFill()
    this.p.stroke(255)

    if (this.walls & FLAG_T) {
      this.p.line(x, y, x + w, y)
    }
    if (this.walls & FLAG_R) {
      this.p.line(x + w, y, x + w, y + w)
    }
    if (this.walls & FLAG_B) {
      this.p.line(x, y + w, x + w, y + w)
    }
    if (this.walls & FLAG_L) {
      this.p.line(x, y, x, y + w)
    }
  }
}
