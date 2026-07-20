import { beforeEach, describe, expect, it } from 'vitest';
import { EyeManager } from './eye-manager';
import { Vector2 } from '../../../shared/math/vector';
import { vectorEquals } from '../../../shared/math/vector/operations';
import { EyeRenderer } from './i-eye-renderer';
import { Eye } from './eye';
import { Matrix3 } from '../../../shared/math/matrix/matrix3';

class MockEyesRenderer implements EyeRenderer {
  public drewEyes: boolean = false;
  public transform: Matrix3 | undefined;

  public setTransform(matrix: Matrix3): void {
    this.transform = matrix;
  }

  public drawEyes(_eyes: Eye[]): void {
    this.drewEyes = true;
  }

  public clear(): void {}
}

describe('Xeyes: Eye Manager (... Optometrist?)', () => {
  let manager: EyeManager;
  let renderer: MockEyesRenderer;
  beforeEach(() => {
    renderer = new MockEyesRenderer();
    manager = new EyeManager(renderer);
  });
  it('exists', () => {
    expect(manager).toBeTruthy();
  });
  it('can load a layout with two eyes', () => {
    manager.loadLayout([new Vector2([0, 0]), new Vector2([2, 0])]);

    expect(manager.eyes).toHaveLength(2);
    expect(vectorEquals(manager.eyes[0].layout, new Vector2([0, 0])));
    expect(vectorEquals(manager.eyes[1].layout, new Vector2([2, 0])));
  });
  it('can update the pupils for all of its eyes', () => {
    manager.loadLayout([new Vector2([0, 0]), new Vector2([2, 0])]);
    manager.setGeometry(150, 100);
    const screenPosition = new Vector2([100, 100]);
    const mouse = new Vector2([100 + 75, 100 + 50]);
    manager.computePupils(mouse, screenPosition);

    expect(manager.eyes[0].pupil[0]).toBeCloseTo(manager.eyes[0].pupilDistance, 4);
    expect(manager.eyes[0].pupil[1]).toBeCloseTo(0, 4);
    expect(manager.eyes[1].pupil[0]).toBeCloseTo(2 - manager.eyes[0].pupilDistance, 4);
    expect(manager.eyes[1].pupil[1]).toBeCloseTo(0, 4);
  });
  it('sends data over to the renderer', () => {
    manager.loadLayout([new Vector2([0, 0]), new Vector2([2, 0])]);
    manager.setGeometry(150, 100);
    const screenPosition = new Vector2([100, 100]);
    const mouse = new Vector2([100 + 75, 100 + 50]);
    manager.computePupils(mouse, screenPosition);
    manager.render();

    expect(renderer.drewEyes).toBeTruthy();
    expect(renderer.transform!.equals(manager.transform)).toBeTruthy();
  });
});
