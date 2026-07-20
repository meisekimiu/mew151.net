import { Vector } from './vector';

/** A 4D Vector */
export class Vector4 extends Vector {
  protected static readonly className = 'Vector4';

  public static scratch = new Vector4();

  constructor(init?: [number, number, number, number]) {
    if (init) {
      super(init);
    } else {
      super(undefined, 4);
    }
  }
}
