import { Vector } from './vector';

/** A 3D vector */
export class Vector3 extends Vector {
  protected static readonly className = 'Vector3';

  public static scratch = new Vector3();

  constructor(init?: [number, number, number]) {
    if (init) {
      super(init);
    } else {
      super(undefined, 3);
    }
  }
}
