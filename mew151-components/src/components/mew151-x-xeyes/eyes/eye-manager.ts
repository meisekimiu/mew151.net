import { Matrix3 } from '../../../shared/math/matrix/matrix3';
import { Vector2, Vector3 } from '../../../shared/math/vector';
import { addVectors, assignVector, divideVector, subtractVectors } from '../../../shared/math/vector/operations';
import { Eye } from './eye';
import { EyeRenderer } from './i-eye-renderer';

export class EyeManager {
  public eyes: Eye[] = [];
  public geometry: Vector2 = new Vector2([0, 0]);
  public transform: Matrix3 = new Matrix3();
  public inverseTransform: Matrix3 = new Matrix3();

  private mouseCoordsInEyeSpace: Vector3 = new Vector3();

  constructor(private renderer: EyeRenderer) {}

  public loadLayout(eyes: Vector2[]) {
    this.eyes = eyes.map(layout => {
      const eye = new Eye();
      assignVector(eye.layout, layout);
      return eye;
    });
  }

  public setGeometry(width: number, height: number): void {
    this.geometry[0] = width;
    this.geometry[1] = height;

    const xMin = this.eyes.reduce((min, eye) => Math.min(min, eye.layout[0] - eye.diameter / 2), Infinity);
    const xMax = this.eyes.reduce((max, eye) => Math.max(max, eye.layout[0] + eye.diameter / 2), -Infinity);
    const xSpan = xMax - xMin;
    let xScale = width / xSpan;
    const yMin = this.eyes.reduce((min, eye) => Math.min(min, eye.layout[0] - eye.diameter / 2 + eye.offset / 2), Infinity);
    const yMax = this.eyes.reduce((max, eye) => Math.max(max, eye.layout[1] + eye.diameter / 2 - eye.offset / 2), -Infinity);
    const ySpan = yMax - yMin;
    let yScale = height / ySpan - 1;

    if (this.eyes.every(eye => eye.hasHat)) {
      // Provide more visual space when The Residents mode is on by zooming out a bit
      xScale /= 2;
      yScale /= 2;
    }

    const focus = divideVector(
      this.eyes.reduce((vec, eye) => addVectors(vec, eye.layout), new Vector2([0, 0])),
      this.eyes.length,
    );
    const xTranslate = width / 2 - focus[0] * xScale;
    const yTranslate = height / 2 - focus[1] * yScale;
    this.transform = new Matrix3([xScale, 0, xTranslate], [0, yScale, yTranslate], [0, 0, 1]);
    this.inverseTransform = this.transform.inverse();
    this.renderer.setTransform(this.transform);
  }

  public computePupils(mouse: Vector2, screenPosition: Vector2): void {
    const [mouseDx, mouseDy] = subtractVectors(mouse, screenPosition);
    assignVector(this.mouseCoordsInEyeSpace, [mouseDx, mouseDy, 1]);
    this.inverseTransform.transform(this.mouseCoordsInEyeSpace, this.mouseCoordsInEyeSpace);
    for (const eye of this.eyes) {
      eye.computePupil(this.mouseCoordsInEyeSpace);
    }
  }

  public render(): void {
    this.renderer.drawEyes(this.eyes);
  }
}
