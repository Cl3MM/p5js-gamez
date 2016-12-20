import { SnowBalls } from './snow/snow'
import { Maze } from './maze/maze'
import { Game } from './invaders/game'
import P5 from 'p5'

const classes = {
  'SnowBalls': SnowBalls,
  'Game': Game,
  'Maze': Maze
}

export class Animate {
  constructor (klass) {
    this.klass = klass
    this.obj = null
    if (!classes[this.klass]) throw new Error(`${this.klass} does not exist`)
    new P5(this.run.bind(this), 'app')
    return this
  }
  run (p) {
    this.obj = new classes[this.klass](p)
    p.setup = () => {
      this.obj.setup(p)
    }
    p.draw = () => {
      p.background('rgb(28, 12, 82)')
      this.obj.draw()
    }
  }
}
