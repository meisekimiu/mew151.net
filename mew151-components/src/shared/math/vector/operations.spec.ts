import { Vector2 } from './vector2';
import { Vector3 } from './vector3';
import * as vec from './operations';
import { ZeroMagnitudeError } from './errors';
import { describe, expect, test } from 'vitest';

describe('Vector Operations', () => {
  test('Vector Addition', () => {
    const a = new Vector2([1, 2]);
    const b = new Vector2([3, 4]);
    const [x, y] = vec.addVectors(a, b);
    expect(x).toBe(4);
    expect(y).toBe(6);
    expect(Vector2.scratch[0]).toBe(4);
    expect(Vector2.scratch[1]).toBe(6);
  });
  test('Vector Assignment', () => {
    const a = new Vector2();
    const b = new Vector2([1, 2]);
    vec.assignVector(a, b);
    const [x, y] = a;
    expect(x).toBe(1);
    expect(y).toBe(2);

    vec.assignVector(b, [0, 0]);
    const [bx, by] = b;
    expect(bx).toBe(0);
    expect(by).toBe(0);
  });
  test('Scalar Multiplication', () => {
    const a = new Vector2([1, 2]);
    const [x, y] = vec.scaleVector(a, 2);
    expect(x).toBe(2);
    expect(y).toBe(4);
    expect(Vector2.scratch[0]).toBe(2);
    expect(Vector2.scratch[1]).toBe(4);
  });
  test('Vector Subtraction', () => {
    const a = new Vector2([1, 2]);
    const b = new Vector2([2, 4]);
    const [x, y] = vec.subtractVectors(b, a);
    expect(x).toBe(1);
    expect(y).toBe(2);
    expect(Vector2.scratch[0]).toBe(1);
    expect(Vector2.scratch[1]).toBe(2);
  });
  test('Clamp Vector', () => {
    const a = new Vector2([65535, -65535]);
    const min = new Vector2([0, 0]);
    const max = new Vector2([255, 255]);
    const [x, y] = vec.clampVector(a, min, max);
    expect(x).toBe(255);
    expect(y).toBe(0);
    expect(Vector2.scratch[0]).toBe(255);
    expect(Vector2.scratch[1]).toBe(0);
  });
  test('Floor', () => {
    const a = new Vector2([Math.E, Math.PI]);
    const [x, y] = vec.floorVector(a);
    expect(x).toBe(2);
    expect(y).toBe(3);
    expect(Vector2.scratch[0]).toBe(2);
    expect(Vector2.scratch[1]).toBe(3);
  });
  test('Ceiling', () => {
    const a = new Vector2([Math.E, Math.PI]);
    const [x, y] = vec.ceilVector(a);
    expect(x).toBe(3);
    expect(y).toBe(4);
    expect(Vector2.scratch[0]).toBe(3);
    expect(Vector2.scratch[1]).toBe(4);
  });
  test('Scalar Division', () => {
    const a = new Vector2([2, 4]);
    const [x, y] = vec.divideVector(a, 2);
    expect(x).toBe(1);
    expect(y).toBe(2);
    expect(Vector2.scratch[0]).toBe(1);
    expect(Vector2.scratch[1]).toBe(2);
  });
  test('Dot Product', () => {
    const a = new Vector2([1, 0]);
    const b = new Vector2([0, 1]);
    const c = new Vector2([1, 2]);
    const d = new Vector2([3, 4]);
    expect(vec.dot(a, b)).toBe(0);
    expect(vec.dot(c, d)).toBe(11);
  });
  test('Magnitude', () => {
    const a = new Vector2([3, 4]);
    const norm = vec.magnitude(a);
    expect(norm).toBe(5);
  });
  test('Normalized', () => {
    const a = new Vector2([2, 0]);
    const [x, y] = vec.normalize(a);
    expect(x).toBe(1);
    expect(y).toBe(0);
    const b = new Vector3([0, 0, 0]);
    expect(() => vec.normalize(b)).toThrowError(ZeroMagnitudeError);
  });
});
