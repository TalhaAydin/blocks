import { createVector } from '../utils/math'
import { Vector } from './math'

export const Movement: Record<string, Vector> = {
  Left: createVector(-1, 0),
  Right: createVector(1, 0),
  Up: createVector(0, -1),
  Down: createVector(0, 1),
}
