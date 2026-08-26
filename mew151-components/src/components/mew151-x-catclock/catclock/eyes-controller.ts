type Point3d = [number, number, number];

export class CatClockEyesController {
  public canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  private pts: [number, number][] = [];

  constructor(private color: string = '#000') {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 54; // From `eyes_width` in `eyes.xbm`
    this.canvas.height = 23; // From `eyes_height` in `eyes.xbm`
    this.context = this.canvas.getContext('2d')!;
  }

  /** Render the eye shapes, `t` should be the time in seconds with a milliseconds component. */
  public render(t: number): void {
    const A = 0.7;
    const omega = 1.0;
    const phi = (3 * Math.PI) / 2;

    const w = Math.PI / 2.0;

    const angle = A * Math.sin(omega * t + phi) + w;

    const x0 = 0.0;
    const y0 = 0.0;
    const z0 = 2.0;
    const r = 1.0;

    let pt: Point3d;

    let i = 0;
    let u = 0;
    for (i = 0, u = -Math.PI / 2.0; u < Math.PI / 2.0; i++, u += 0.25) {
      pt = [x0 + r * Math.cos(u) * Math.cos(angle + Math.PI / 7.0), y0 + r * Math.sin(u), z0 + r * Math.cos(u) * Math.sin(angle + Math.PI / 7.0)];

      this.pts[i] = [Math.floor((pt[2] == 0.0 ? pt[0] : pt[0] / pt[2]) * 23.0 + 12.0), Math.floor((pt[2] == 0.0 ? pt[1] : pt[1] / pt[2]) * 23.0 + 11.0)];
    }

    for (u = Math.PI / 2.0; u > -Math.PI / 2.0; i++, u -= 0.25) {
      pt = [x0 + r * Math.cos(u) * Math.cos(angle - Math.PI / 7.0), y0 + r * Math.sin(u), z0 + r * Math.cos(u) * Math.sin(angle - Math.PI / 7.0)];

      this.pts[i] = [Math.floor((pt[2] == 0.0 ? pt[0] : pt[0] / pt[2]) * 23.0 + 12.0), Math.floor((pt[2] == 0.0 ? pt[1] : pt[1] / pt[2]) * 23.0 + 11.0)];
    }

    this.context.reset();
    this.context.clearRect(0, 0, this.canvas.width * 2, this.canvas.height * 2);

    this.context.lineWidth = 15;
    this.context.fillStyle = this.color;
    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';

    this.renderPoints(0);
    this.renderPoints(31);
  }

  private renderPoints(xOffset: number): void {
    const firstPoint = this.pts[0];
    firstPoint[0] += xOffset;
    this.context.moveTo(...firstPoint);
    for (let j = 1; j < this.pts.length; j++) {
      this.pts[j][0] += xOffset;
      this.context.lineTo(...this.pts[j]);
    }
    this.context.closePath();
    this.context.fill();
  }
}
