import { EntityRotationDirection } from '../redux/actions/entities'
import { EntityData } from '../redux/reducers/entities'
import { getHash } from './coordinate'
import { getNextEntityRotation, getPlacedEntityBlocks } from './entities'
import { createJPiece } from './piece'
import { createPoint } from './point'
import { createVector } from './vector'

describe('getNextEntityRotation()', () => {
  it('rotates right', () => {
    expect(getNextEntityRotation(90, EntityRotationDirection.Right)).toBe(180)
    expect(getNextEntityRotation(180, EntityRotationDirection.Right)).toBe(270)
    expect(getNextEntityRotation(270, EntityRotationDirection.Right)).toBe(0)
    expect(getNextEntityRotation(0, EntityRotationDirection.Right)).toBe(90)
  })

  it('rotates left', () => {
    expect(getNextEntityRotation(90, EntityRotationDirection.Left)).toBe(0)
    expect(getNextEntityRotation(0, EntityRotationDirection.Left)).toBe(270)
    expect(getNextEntityRotation(270, EntityRotationDirection.Left)).toBe(180)
    expect(getNextEntityRotation(180, EntityRotationDirection.Left)).toBe(90)
  })
})

describe('getPlacedEntityBlocks()', () => {
  it('returns blocks unchanged', () => {
    const entityData: EntityData = {
      ...createJPiece(),
      position: createVector(0, 0),
    }
    expect(getPlacedEntityBlocks(entityData)).toEqual(entityData.shape)
  })

  it('returns blocks changed', () => {
    const entityData: EntityData = {
      ...createJPiece(),
      position: createVector(3, 5),
    }
    expect(getPlacedEntityBlocks(entityData)).not.toEqual(entityData.shape)
  })

  it('moves the blocks', () => {
    expect(
      Object.keys(
        getPlacedEntityBlocks({
          ...createJPiece(),
          position: createVector(3, 5),
        })
      )
    ).toIncludeSameMembers([
      getHash(createPoint(3, 4)),
      getHash(createPoint(3, 5)),
      getHash(createPoint(3, 6)),
      getHash(createPoint(2, 6)),
    ])

    expect(
      Object.keys(
        getPlacedEntityBlocks({
          ...createJPiece(),
          position: createVector(-1, -1),
        })
      )
    ).toIncludeSameMembers([
      getHash(createPoint(-1, 0)),
      getHash(createPoint(-1, -1)),
      getHash(createPoint(-1, -2)),
      getHash(createPoint(-2, 0)),
    ])
  })

  it('rotates the blocks', () => {
    expect(
      Object.keys(
        getPlacedEntityBlocks({
          ...createJPiece(),
          position: createVector(0, 0),
          rotation: 90,
        })
      )
    ).toIncludeSameMembers([
      getHash(createPoint(-1, -1)),
      getHash(createPoint(-1, 0)),
      getHash(createPoint(0, 0)),
      getHash(createPoint(1, 0)),
    ])

    expect(
      Object.keys(
        getPlacedEntityBlocks({
          ...createJPiece(),
          position: createVector(0, 0),
          rotation: 270,
        })
      )
    ).toIncludeSameMembers([
      getHash(createPoint(-1, 0)),
      getHash(createPoint(0, 0)),
      getHash(createPoint(1, 0)),
      getHash(createPoint(1, 1)),
    ])
  })

  it('rotates and moves the blocks', () => {
    expect(
      Object.keys(
        getPlacedEntityBlocks({
          ...createJPiece(),
          position: createVector(2, 1),
          rotation: 90,
        })
      )
    ).toIncludeSameMembers([
      getHash(createPoint(1, 0)),
      getHash(createPoint(1, 1)),
      getHash(createPoint(2, 1)),
      getHash(createPoint(3, 1)),
    ])

    expect(
      Object.keys(
        getPlacedEntityBlocks({
          ...createJPiece(),
          position: createVector(-9, -9),
          rotation: 180,
        })
      )
    ).toIncludeSameMembers([
      getHash(createPoint(-9, -9)),
      getHash(createPoint(-9, -8)),
      getHash(createPoint(-9, -10)),
      getHash(createPoint(-8, -10)),
    ])
  })
})
