import { getHash } from './coordinate'
import { createEntityData } from './entities'
import { createPoint } from './point'
import { createVector } from './vector'

export const createIPiece = () =>
  createEntityData(
    {
      [getHash(createPoint(-1, 0))]: { color: 'turquoise' },
      [getHash(createPoint(0, 0))]: { color: 'turquoise' },
      [getHash(createPoint(1, 0))]: { color: 'turquoise' },
      [getHash(createPoint(2, 0))]: { color: 'turquoise' },
    },
    createVector(4, 0),
    0
  )

export const createOPiece = () =>
  createEntityData(
    {
      [getHash(createPoint(-1, 0))]: { color: 'gold' },
      [getHash(createPoint(0, 0))]: { color: 'gold' },
      [getHash(createPoint(-1, 1))]: { color: 'gold' },
      [getHash(createPoint(0, 1))]: { color: 'gold' },
    },
    createVector(5, 0),
    0
  )

export const createTPiece = () =>
  createEntityData(
    {
      [getHash(createPoint(0, 0))]: { color: 'mediumpurple' },
      [getHash(createPoint(-1, 0))]: { color: 'mediumpurple' },
      [getHash(createPoint(1, 0))]: { color: 'mediumpurple' },
      [getHash(createPoint(0, 1))]: { color: 'mediumpurple' },
    },
    createVector(5, 0),
    0
  )

export const createJPiece = () =>
  createEntityData(
    {
      [getHash(createPoint(0, 1))]: { color: 'dodgerblue' },
      [getHash(createPoint(1, 1))]: { color: 'dodgerblue' },
      [getHash(createPoint(1, 0))]: { color: 'dodgerblue' },
      [getHash(createPoint(1, -1))]: { color: 'dodgerblue' },
    },
    createVector(5, 1),
    0
  )

export const createLPiece = () =>
  createEntityData(
    {
      [getHash(createPoint(0, 1))]: { color: 'lightsalmon' },
      [getHash(createPoint(-1, 1))]: { color: 'lightsalmon' },
      [getHash(createPoint(-1, 0))]: { color: 'lightsalmon' },
      [getHash(createPoint(-1, -1))]: { color: 'lightsalmon' },
    },
    createVector(5, 1),
    0
  )

export const createSPiece = () =>
  createEntityData(
    {
      [getHash(createPoint(0, 0))]: { color: 'yellowgreen' },
      [getHash(createPoint(1, 0))]: { color: 'yellowgreen' },
      [getHash(createPoint(0, 1))]: { color: 'yellowgreen' },
      [getHash(createPoint(-1, 1))]: { color: 'yellowgreen' },
    },
    createVector(5, 0),
    0
  )

export const createZPiece = () =>
  createEntityData(
    {
      [getHash(createPoint(0, 0))]: { color: 'crimson' },
      [getHash(createPoint(-1, 0))]: { color: 'crimson' },
      [getHash(createPoint(0, 1))]: { color: 'crimson' },
      [getHash(createPoint(1, 1))]: { color: 'crimson' },
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
