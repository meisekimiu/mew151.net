import { Matrix3 } from '../../../shared/math/matrix/matrix3';
import { Eye } from './eye';

export class CanvasEyeRenderer {
  public backgroundColor: string = '#fff';
  public foregroundColor: string = '#000';

  constructor(private context: CanvasRenderingContext2D) {}

  public setTransform(transform: Matrix3): void {
    this.context.setTransform(transform);
  }

  public drawEyes(eyes: Eye[]): void {
    this.clear();
    for (const eye of eyes) {
      this.drawEyeOutline(eye);
      this.drawPupil(eye);
    }
  }

  private drawPupil(eye: Eye) {
    const radius = eye.pupilDiameter / 2;
    this.context.fillStyle = `${this.foregroundColor}`;
    this.context.beginPath();
    this.context.ellipse(eye.pupil[0], eye.pupil[1], radius, radius, 0, 0, Math.PI * 2);
    this.context.fill();
  }

  private drawEyeOutline(eye: Eye) {
    const radius = eye.whiteDiameter / 2 + eye.thickness / 2;
    this.context.lineWidth = eye.thickness;
    this.context.strokeStyle = `${this.foregroundColor}`;
    this.context.fillStyle = `${this.backgroundColor}`;
    this.context.beginPath();
    this.context.ellipse(eye.layout[0], eye.layout[1], radius, radius, 0, 0, Math.PI * 2);
    this.context.fill();
    this.context.stroke();

    this.drawResidentsMode(eye);
  }

  private drawResidentsMode(eye: Eye) {
    if (eye.hasHat && eye.layout[1] === 0) {
      // Only draw the top row of hats if you combine biblically accurate and residents mode together
      this.context.beginPath();
      this.context.strokeStyle = '#000';
      this.context.moveTo(eye.layout[0] - eye.whiteDiameter / 1.5, eye.layout[1] - eye.whiteDiameter / 2);
      this.context.lineTo(eye.layout[0] + eye.whiteDiameter / 1.5, eye.layout[1] - eye.whiteDiameter / 2);
      this.context.lineWidth = eye.thickness * 2;
      this.context.stroke();

      const hatWidthRatio = 1 / 2.5;
      this.context.rect(
        eye.layout[0] - eye.whiteDiameter * hatWidthRatio,
        eye.layout[1] - eye.whiteDiameter * 2,
        2 * eye.whiteDiameter * hatWidthRatio,
        eye.whiteDiameter * 2 - eye.whiteDiameter / 2,
      );
      this.context.fillStyle = '#000';
      this.context.fill();
    }
  }

  public clear(): void {
    this.context.clearRect(-1e10, -1e10, 2e10, 2e10);
  }
}
