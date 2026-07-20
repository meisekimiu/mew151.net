import { Vector2 } from '../../shared/math/vector';
import { EyeManager } from './eyes/eye-manager';
import { CanvasEyeRenderer } from './eyes/eye-renderer';

export class Xeyes {
  /** The width of the display window */
  public get width(): number {
    return this._width;
  }

  public set width(num: number) {
    this._width = num;
    this.canvas.width = this._width;
    this.canvas.style.width = `${this._width}px`;
    this.instance.setGeometry(this.canvas.clientWidth, this.canvas.clientHeight);
  }

  /** The height of the display window */
  public get height(): number {
    return this._height;
  }

  public set height(num: number) {
    this._height = num;
    this.canvas.height = this._height;
    this.canvas.style.height = `${this._height}px`;
    this.instance.setGeometry(this.canvas.clientWidth, this.canvas.clientHeight);
  }

  /** Be afraidn't */
  public biblicallyAccurate: boolean = false;

  /** Ignorance of your culture is not considered cool */
  public theResidentsMode: boolean = false;

  private static standardLayout: [number, number][] = [
    [0, 0],
    [2, 0],
  ];

  private static biblicallyAccurateLayout: [number, number][] = [
    [0.0 + 0.75, 0.0],
    [1.5 + 0.75, 0.0],
    [3.0 + 0.75, 0.0],

    [0.0 + 0.0, 1.4],
    [1.5 + 0.0, 1.4],
    [3.0 + 0.0, 1.4],
    [4.5 + 0.0, 1.4],

    [0.0 + 0.75, 2.8],
    [1.5 + 0.75, 2.8],
    [3.0 + 0.75, 2.8],
  ];

  private static residentsLayout: [number, number][] = [[0, 0]];

  private renderer: CanvasEyeRenderer;

  private instance: EyeManager;

  private mouse: Vector2 = new Vector2([0, 0]);
  private screenPosition: Vector2 = new Vector2([0, 0]);

  private _width: number = 150;
  private _height: number = 100;

  constructor(private canvas: HTMLCanvasElement) {
    this.renderer = new CanvasEyeRenderer(this.canvas.getContext('2d')!);
    this.instance = new EyeManager(this.renderer);
    this.init();
    this.initialRender();
    document.addEventListener('mousemove', ev => {
      this.updateEyes(ev.clientX, ev.clientY);
    });
    document.addEventListener('focusin', ev => {
      if (ev.target instanceof Element) {
        const pos = ev.target.getBoundingClientRect();
        this.updateEyes(pos.x + pos.width / 2, pos.y + pos.height / 2);
      }
    });
  }

  private initialRender() {
    const position = this.canvas.getBoundingClientRect();
    setTimeout(() => {
      this.updateEyes(position.x + position.width, position.y + position.height / 2);
    });
  }

  private updateEyes(x: number, y: number) {
    this.mouse[0] = x;
    this.mouse[1] = y;
    const rect = this.canvas.getBoundingClientRect();
    this.screenPosition[0] = rect.x;
    this.screenPosition[1] = rect.y;
    this.instance.computePupils(this.mouse, this.screenPosition);
    this.instance.render();
  }

  private getLayout(): Vector2[] {
    const layout = this.biblicallyAccurate ? Xeyes.biblicallyAccurateLayout : this.theResidentsMode ? Xeyes.residentsLayout : Xeyes.standardLayout;
    return layout.map(arr => new Vector2(arr));
  }

  public init(): void {
    this.instance.loadLayout(this.getLayout());
    if (this.theResidentsMode) {
      this.instance.eyes.forEach(eye => (eye.hasHat = true));
    }
    this.instance.setGeometry(this.canvas.clientWidth, this.canvas.clientHeight);
  }
}
