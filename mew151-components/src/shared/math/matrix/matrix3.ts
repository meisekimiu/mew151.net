import { Vector3 } from '../vector';
import { assignVector, dot } from '../vector/operations';

type Vector3OrArray = Vector3 | [number, number, number];

/** A simple 3x3 matrix class */
export class Matrix3 {
  public rows: [Vector3, Vector3, Vector3] = [new Vector3(), new Vector3(), new Vector3()];

  private static scratch: Matrix3 = new Matrix3();

  constructor(v1?: number | Vector3OrArray, v2?: number | Vector3OrArray, v3?: number | Vector3OrArray, i?: number, j?: number, k?: number, l?: number, m?: number, n?: number) {
    if (typeof v1 !== 'number' && typeof v1 !== 'undefined' && typeof v2 !== 'number' && typeof v2 !== 'undefined' && typeof v3 !== 'number' && typeof v3 !== 'undefined') {
      assignVector(this.rows[0], v1);
      assignVector(this.rows[1], v2);
      assignVector(this.rows[2], v3);
    } else {
      this.rows[0][0] = (v1 as number) ?? 0;
      this.rows[0][1] = (v2 as number) ?? 0;
      this.rows[0][2] = (v3 as number) ?? 0;
      this.rows[1][0] = i ?? 0;
      this.rows[1][1] = j ?? 0;
      this.rows[1][2] = k ?? 0;
      this.rows[2][0] = l ?? 0;
      this.rows[2][1] = m ?? 0;
      this.rows[2][2] = n ?? 0;
    }
  }

  /** Gets the value of the matrix at the specific location */
  public get(row: number, column: number): number {
    return this.rows[row][column];
  }

  /** Returns true if this matrix is equal to the other */
  public equals(matrix: Matrix3): boolean {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.rows[i][j] !== matrix.rows[i][j]) {
          return false;
        }
      }
    }
    return true;
  }

  /** Assign the values from one Matrix to another */
  public assign(matrix: Matrix3): Matrix3 {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.rows[i][j] = matrix.rows[i][j];
      }
    }
    return this;
  }

  /** Adopted from a macro used in Godot's invert algorithm */
  private cofac(row1: number, col1: number, row2: number, col2: number): number {
    return this.rows[row1][col1] * this.rows[row2][col2] - this.rows[row1][col2] * this.rows[row2][col1];
  }

  /** Get the inverse of the matrix */
  public inverse(output: Matrix3 = Matrix3.scratch): Matrix3 {
    // Adapted from Godot engine's invert function: https://github.com/godotengine/godot/blob/master/core/math/basis.cpp

    const m = output.assign(this);
    const co0 = this.cofac(1, 1, 2, 2);
    const co1 = this.cofac(1, 2, 2, 0);
    const co2 = this.cofac(1, 0, 2, 1);
    const inverse_determinant = 1.0 / (this.rows[0][0] * co0 + this.rows[0][1] * co1 + this.rows[0][2] * co2);

    m.rows[0][0] = co0 * inverse_determinant;
    m.rows[0][1] = this.cofac(0, 2, 2, 1) * inverse_determinant;
    m.rows[0][2] = this.cofac(0, 1, 1, 2) * inverse_determinant;
    m.rows[1][0] = co1 * inverse_determinant;
    m.rows[1][1] = this.cofac(0, 0, 2, 2) * inverse_determinant;
    m.rows[1][2] = this.cofac(0, 2, 1, 0) * inverse_determinant;
    m.rows[2][0] = co2 * inverse_determinant;
    m.rows[2][1] = this.cofac(0, 1, 2, 0) * inverse_determinant;
    m.rows[2][2] = this.cofac(0, 0, 1, 1) * inverse_determinant;
    return m;
  }

  public static getIdentity(): Matrix3 {
    return new Matrix3(1, 0, 0, 0, 1, 0, 0, 0, 1);
  }

  public transform(vec: Vector3, out: Vector3 = Vector3.scratch): Vector3 {
    for (let i = 0; i < 3; i++) {
      out[i] = dot(this.rows[i], vec);
    }
    return out;
  }

  /** See: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform */
  public get a(): number {
    return this.rows[0][0];
  }

  /** See: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform */
  public get b(): number {
    return this.rows[1][0];
  }

  /** See: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform */
  public get c(): number {
    return this.rows[0][1];
  }

  /** See: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform */
  public get d(): number {
    return this.rows[1][1];
  }

  /** See: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform */
  public get e(): number {
    return this.rows[0][2];
  }

  /** See: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform */
  public get f(): number {
    return this.rows[1][2];
  }
}
