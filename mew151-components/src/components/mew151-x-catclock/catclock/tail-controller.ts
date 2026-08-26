export class CatClockTailController {
  public canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  private static tail: [number, number][] = [
    [0, 0],
    [0, 76],
    [3, 82],
    [10, 84],
    [18, 82],
    [21, 76],
    [21, 70],
  ];

  private static tailOffset: [number, number] = [74, -15];

  /** The position where the cat's tail connects, from DEF_CAT_BOTTOM in xclock.c ("Distance to cat's butt") */
  public static bottomPosition: number = 210;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 150; // Default width of the cat canvas
    this.canvas.height = 89; // From TAIL_HEIGHT in xclock.c
    this.context = this.canvas.getContext('2d')!;
  }

  /** Renders the tail to the `canvas` property. `t` should be the current time in seconds. */
  public render(t: number): void {
    const newTail = this.getNewTail(t * Math.PI);

    this.context.clearRect(0, 0, 150, 300);
    this.context.beginPath();
    this.context.lineWidth = 15;
    this.context.lineJoin = 'round';
    this.context.lineCap = 'round';
    this.context.strokeStyle = '#000';

    const firstPoint = newTail.shift()!;
    this.context.moveTo(...firstPoint);
    for (const point of newTail) {
      this.context.lineTo(...point);
      this.context.stroke();
    }
  }

  /**
   * Gets the "Off Center Tail" points. This is the first step in tranforming our tail points.
   */
  private getOffCenterTail(): [number, number][] {
    const offCenterTailAngle = -0.08;
    const sinTheta = Math.sin(offCenterTailAngle);
    const cosTheta = Math.cos(offCenterTailAngle);
    return CatClockTailController.tail.map(tailPoint => [
      Math.floor(tailPoint[0] * cosTheta + tailPoint[1] * sinTheta),
      Math.floor(-tailPoint[0] * sinTheta + tailPoint[1] * cosTheta),
    ]);
  }

  /**
   * Gets the "New Tail" points, the final transformed points of our tail to be drawn on the screen.
   * @param t Time in seconds with milliseconds as float component
   * @returns The points where the tail should be drawn
   */
  private getNewTail(t: number): [number, number][] {
    const A = 0.4;
    const omega = 1.0;
    const phi = (3 * Math.PI) / 2;

    const angle = A * Math.sin(omega * t + phi);
    const sinTheta = Math.sin(angle);
    const cosTheta = Math.cos(angle);

    return this.getOffCenterTail().map(tailPoint => [
      Math.floor(tailPoint[0] * cosTheta + tailPoint[1] * sinTheta) + CatClockTailController.tailOffset[0],
      Math.floor(-tailPoint[0] * sinTheta + tailPoint[1] * cosTheta) + CatClockTailController.tailOffset[1],
    ]);
  }
}
