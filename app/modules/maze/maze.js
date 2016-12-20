import { Cell } from './cell'

export class Maze {
  constructor (p) {
    this.p = p
    this.w = p.windowWidth
    this.h = p.windowHeight
    this.size = 25
    this.fps = 60
    this.cols = Math.floor(this.w / this.size)
    this.rows = Math.floor(this.h / this.size)
    this.cells = []
    this.stack = []
    this.current = null
    this.running = false
  }
  setup () {
    let ri = Math.floor(this.p.random(0, this.cols))
    let rj = Math.floor(this.p.random(0, this.rows))
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.cells.push(new Cell(i, j, this.size, this.cols, this.rows, this.w, this.h, this.p))
        if (i === ri && j === rj) {
          this.current = this.cells[this.cells.length - 1]
          this.current.visited = true
        }
      }
    }
    this.p.colorMode(this.p.HSB)
    this.p.frameRate(this.fps)
    this.p.createCanvas(this.p.windowWidth, this.p.windowHeight)
    this.p.mousePressed = () => {
      this.p.loop()
      this.p.noLoop()
    }
  }
  checkUnvisited () {
    return !this.cells.filter(c => !c.visited)[0]
  }

  checkNeighbours (cell) {
    let nbs = [
      this.cells[this.index(cell.i, cell.j - 1)],
      this.cells[this.index(cell.i + 1, cell.j)],
      this.cells[this.index(cell.i, cell.j + 1)],
      this.cells[this.index(cell.i - 1, cell.j)]
    ].filter(n => n && !n.visited).map(c => c.neighbour())
    return nbs[0] ? nbs[Math.floor(Math.random() * nbs.length)] : null
  }

  index (i, j) {
    if (i < 0 || i >= this.cols || j < 0 || j >= this.rows) return -1
    return j + i * this.rows
  }

  removeWall (a, b) {
    let x = a.i - b.i
    let y = a.j - b.j

    if (x === -1) {
      b.walls ^= 0b1000
      a.walls ^= 0b0010
    } else if (x === 1) {
      b.walls ^= 0b0010
      a.walls ^= 0b1000
    }
    if (y === -1) {
      b.walls ^= 0b0001
      a.walls ^= 0b0100
    } else if (y === 1) {
      b.walls ^= 0b0100
      a.walls ^= 0b0001
    }
  }

  draw () {
    // 1. Make the initial cell the current cell and mark it as visited
    // 2. While there are unvisited cells
    //    1. If the current cell has any neighbours which have not been visited
    //       1. Choose randomly one of the unvisited neighbours
    //       2. Push the current cell to the stack
    //       3. Remove the wall between the current cell and the chosen cell
    //       4. Make the chosen cell the current cell and mark it as visited
    //    2. Else if stack is not empty
    //       1. Pop a cell from the stack
    //       2. Make it the current cell

    this.cells.forEach((c) => {
      c.draw()
      if (c === this.current) c.highlight()
    })

    if (this.checkUnvisited()) {
      console.log('MAZE COMPLETED')
      this.p.noLoop()
    }

    let next = this.checkNeighbours(this.current)
    if (next) {
      this.stack.push(this.current)
      this.removeWall(this.current, next)
      this.current = next
    } else if (this.stack[0]) {
      this.current = this.stack.pop()
    }
    this.current.visited = true
  }
}
