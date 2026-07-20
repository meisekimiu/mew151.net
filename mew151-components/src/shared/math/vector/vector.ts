/** A generic n-dimensional vector class. Extends `Float32Array`, so the vector elements are actually just array elements. */
export class Vector extends Float32Array {
  protected static className = 'Vector';

  constructor(init?: number[], dim = 1) {
    if (init) {
      super(init);
    } else {
      super(dim);
    }
  }

  public $getScratch(): this {
    const { constructor } = Object.getPrototypeOf(this);
    if (constructor.scratch) {
      return constructor.scratch as this;
    }
    return new constructor(undefined, this.length);
  }

  public clone(): this {
    const { constructor } = Object.getPrototypeOf(this);
    return new constructor([...this]) as this;
  }

  public toString(): string {
    const { constructor } = Object.getPrototypeOf(this);
    return `${constructor.className ?? 'Vector'}(${this.join(', ')})`;
  }
}
