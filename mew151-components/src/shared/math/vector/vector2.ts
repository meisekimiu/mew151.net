import { Vector } from './vector';

/** A 2D vector */
export class Vector2 extends Vector {
  protected static readonly className = 'Vector2';

  public static scratch = new Vector2();

  constructor(init?: [number, number]) {
    if (init) {
      super(init);
    } else {
      super(undefined, 2);
    }
  }
}
