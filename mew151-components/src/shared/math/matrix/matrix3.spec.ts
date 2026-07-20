import { describe, expect, it } from 'vitest';
import { Matrix3 } from './matrix3';
import { Vector3 } from '../vector';
import { assignVector, vectorEquals } from '../vector/operations';

describe('3x3 Matrix', () => {
  it('exists', () => {
    const matrix = new Matrix3();
    expect(matrix).toBeTruthy();
  });
  it('can be constructed', () => {
    const fullMatrix = new Matrix3(1, 2, 3, 4, 5, 6, 7, 8, 9);
    const columnsMatrix = new Matrix3([1, 2, 3], [4, 5, 6], [7, 8, 9]);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        expect(fullMatrix.get(i, j)).toBe(i * 3 + j + 1);
        expect(columnsMatrix.get(i, j)).toBe(i * 3 + j + 1);
      }
    }

    expect(fullMatrix.equals(columnsMatrix)).toBeTruthy();
  });
  it('can get the identity matrix', () => {
    const identity = Matrix3.getIdentity();

    expect(identity.equals(new Matrix3([1, 0, 0], [0, 1, 0], [0, 0, 1]))).toBeTruthy();
  });
  it('can calculate the inverse', () => {
    expect(Matrix3.getIdentity().inverse().equals(Matrix3.getIdentity())).toBeTruthy();

    const matrix = new Matrix3(1, 2, 1, 3, 7, 2, 2, 4, 3);
    expect(matrix.inverse().equals(new Matrix3(13, -2, -3, -5, 1, 1, -2, 0, 1))).toBeTruthy();
  });
  it('can transform a vector', () => {
    const vector: Vector3 = new Vector3([1, 2, 3]);
    const output: Vector3 = new Vector3();

    Matrix3.getIdentity().transform(vector, output);
    expect(vectorEquals(vector, output)).toBeTruthy();

    assignVector(vector, [0, 0, 1]);
    new Matrix3([2, 0, 25], [0, 4, 50], [0, 0, 1]).transform(vector, output);
    expect(vectorEquals(output, new Vector3([25, 50, 1]))).toBeTruthy();
  });
});
