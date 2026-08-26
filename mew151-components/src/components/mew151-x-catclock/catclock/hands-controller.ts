export class CatClockHandsController {
  public canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  private radius: number;

  private static minuteHandFract = 70;
  private static hourHandFract = 40;

  private static handWidthFract = 7;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 150;
    this.canvas.height = 300;
    this.context = this.canvas.getContext('2d')!;

    this.radius = Math.round(Math.min(this.canvas.width, this.canvas.height)) / 3.45;
  }

  public render(): void {
    const minuteHandLength = (CatClockHandsController.minuteHandFract * this.radius) / 100;
    const hourHandLength = (CatClockHandsController.hourHandFract * this.radius) / 100;

    const handWidth = ((CatClockHandsController.handWidthFract * this.radius) / 100) * 2;

    const date = new Date();

    this.context.reset();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawHand(minuteHandLength, handWidth, date.getMinutes() / 60.0);
    this.drawHand(hourHandLength, handWidth, ((date.getHours() % 12) + date.getMinutes() / 60.0) / 12.0);
  }

  public drawHand(length: number, width: number, fractionOfACircle: number): void {
    /*
     *  A full circle is 2 PI radians.
     *  Angles are measured from 12 o'clock, clockwise increasing.
     *  Since in X, +x is to the right and +y is downward:
     *
     *    x = x0 + r * sin(theta)
     *    y = y0 - r * cos(theta)
     *
     */
    const angle = Math.PI * 2 * fractionOfACircle;
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);

    /*
     * Order of points when drawing the hand.
     *
     *        1,4
     *        / \
     *       /   \
     *      /     \
     *    2 ------- 3
     */
    const wc = width * cosAngle;
    const ws = width * sinAngle;

    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;

    this.context.lineWidth = 1;
    this.context.strokeStyle = '#000';
    this.context.fillStyle = '#000';

    this.context.beginPath();
    this.context.moveTo(centerX + Math.round(length * sinAngle), centerY - Math.round(length * cosAngle));
    this.context.lineTo(centerX - Math.round(ws + wc), centerY + Math.round(wc - ws));
    this.context.lineTo(centerX - Math.round(ws - wc), centerY + Math.round(wc + ws));
    this.context.closePath();
    this.context.fill();
    this.context.stroke();
  }
}
