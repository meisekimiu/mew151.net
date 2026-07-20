import { Vector2 } from '../../../shared/math/vector';
import { assignVector, subtractVectors } from '../../../shared/math/vector/operations';

/**
 * Represents an individual eye in xeyes.
 */
export class Eye {
  /** The position of the eye */
  public layout: Vector2 = new Vector2([0, 0]);
  /** The position of the pupil */
  public pupil: Vector2 = new Vector2([0, 0]);

  /** The gap between eyes */
  public offset: number = 0.1;
  /** How thick the outlines on the eyes are */
  public thickness: number = 0.175;
  /** The full diameter of each eye. This is "border-box" sized, so it includes the offset and thickness. */
  public diameter: number = 2.0;
  /** The diameter of just the white part of the eye */
  public get whiteDiameter(): number {
    return this.diameter - (this.thickness + this.offset) * 2;
  }

  /** The diameter of each pupil */
  public pupilDiameter: number = 0.3;
  /** The padding between the pupil and the edge of the eye */
  public pupilPadding: number = 0.175;
  /** How far the pupil can travel from the center of the eye */
  public get pupilDistance(): number {
    return (this.whiteDiameter - this.pupilDiameter) / 2 - this.pupilPadding;
  }

  /** Whether the eye has a top hat or not */
  public hasHat: boolean = false;

  /** Sets the pupil to look at the mouse, based on `computePupil` from xeyes */
  public computePupil(mouse: Vector2): void {
    const position = new Vector2();
    assignVector(position, this.layout);
    const [dx, dy] = subtractVectors(mouse, position);
    if (dx || dy) {
      const angle = Math.atan2(dy, dx);
      const distance = Math.min(this.pupilDistance, Math.hypot(dx, dy));
      position[0] += Math.cos(angle) * distance;
      position[1] += Math.sin(angle) * distance;
    }
    assignVector(this.pupil, position);
  }
}
