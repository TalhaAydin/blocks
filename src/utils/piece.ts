import { getHash } from './coordinate'
import { createEntityData } from './entities'
import { createPoint } from './point'
import { createVector } from './vector'

export const createIPiece = () =>
  createEntityData(
    {
      [getHash(createPoint(-1, 0))]: { color: 'cyan' },
      [getHash(createPoint(0, 0))]: { color: 'cyan' },
      [getHash(createPoint(1, 0))]: { color: 'cyan' },
      [getHash(createPoint(2, 0))]: { color: 'cyan' },
    },
    createVector(4, 0),
    0
  )

export const createOPiece = () =>
  createEntityData(
    {
      [getHash(createPoint(-1, 0))]: { color: 'yellow' },
      [getHash(createPoint(0, 0))]: { color: 'yellow' },
      [getHash(createPoint(-1, 1))]: { color: 'yellow' },
      [getHash(createPoint(0, 1))]: { color: 'yellow' },
    },
    createVector(5, 0),
    0
  )

export const createTPiece = () =>
  createEntityData(
    {
      [getHash(createPoint(0, 0))]: { color: 'purple' },
      [getHash(createPoint(-1, 0))]: { color: 'purple' },
      [getHash(createPoint(1, 0))]: { color: 'purple' },
      [getHash(createPoint(0, 1))]: { color: 'purple' },
    },
    createVector(5, 0),
    0
  )

export const createJPiece = () =>
  createEntityData(
    {
      [getHash(createPoint(0, 0))]: { color: 'blue' },
      [getHash(createPoint(0, -1))]: { color: 'blue' },
      [getHash(createPoint(0, 1))]: { color: 'blue' },
      [getHash(createPoint(-1, 1))]: { color: 'blue' },
    },
    createVector(5, 1),
    0
  )

export const createLPiece = () =>
  createEntityData(
    {
      [getHash(createPoint(0, 0))]: { color: 'orange' },
      [getHash(createPoint(0, -1))]: { color: 'orange' },
      [getHash(createPoint(0, 1))]: { color: 'orange' },
      [getHash(createPoint(1, 1))]: { color: 'orange' },
    },
    createVector(4, 1),
    0
  )

export const createSPiece = () =>
  createEntityData(
    {
      [getHash(createPoint(0, 0))]: { color: 'green' },
      [getHash(createPoint(1, 0))]: { color: 'green' },
      [getHash(createPoint(0, 1))]: { color: 'green' },
      [getHash(createPoint(-1, 1))]: { color: 'green' },
    },
    createVector(5, 0),
    0
  )

export const createZPiece = () =>
  createEntityData(
    {
      [getHash(createPoint(0, 0))]: { color: 'red' },
      [getHash(createPoint(-1, 0))]: { color: 'red' },
      [getHash(createPoint(0, 1))]: { color: 'red' },
      [getHash(createPoint(1, 1))]: { color: 'red' },
    },
    createVector(5, 0),
    0
  )

export const createRandomPiece = () =>
  [
    createIPiece,
    createOPiece,
    createTPiece,
    createJPiece,
    createLPiece,
    createSPiece,
    createZPiece,
  ][Math.floor(Math.random() * 7)].call(null)
