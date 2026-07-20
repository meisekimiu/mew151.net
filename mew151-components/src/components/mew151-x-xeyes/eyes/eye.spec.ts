import { beforeEach, describe, expect, it } from 'vitest';
import { Eye } from './eye';
import { Vector2 } from '../../../shared/math/vector';
import { assignVector, vectorEquals } from '../../../shared/math/vector/operations';

describe('xeyes: Eye', () => {
  let eye: Eye;
  beforeEach(() => {
    eye = new Eye();
  });
  it('can get properties of the eye', () => {
    eye.diameter = 10;
    eye.thickness = 1;
    eye.offset = 1;

    eye.pupilDiameter = 1;
    eye.pupilPadding = 1;

    expect(eye.whiteDiameter).toBe(6);
    expect(eye.pupilDistance).toBe(1.5);
  });
  it('can look at the mouse when it is exactly on top of it', () => {
    eye.layout[0] = 2;
    eye.layout[1] = 0;

    const mouse = new Vector2();
    assignVector(mouse, eye.layout);
    eye.computePupil(mouse);

    expect(vectorEquals(eye.layout, eye.pupil), `Expecting ${eye.pupil} to equal ${eye.layout}`).toBeTruthy();
  });
  it('can look at the mouse when it is very far away', () => {
    eye.computePupil(new Vector2([10000, 0]));

    expect(eye.pupil[1]).toBe(0);
    expect(eye.pupil[0]).toBeCloseTo(eye.pupilDistance, 4);
  });
  it('can look at the mouse when it is in between the center and the max distance', () => {
    eye.computePupil(new Vector2([eye.pupilDistance / 2, -eye.pupilDistance / 2]));

    expect(eye.pupil[0]).toBeCloseTo(eye.pupilDistance / 2);
    expect(eye.pupil[1]).toBeCloseTo(eye.pupilDistance / -2);
  });
});
