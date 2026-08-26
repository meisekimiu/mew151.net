import { catback, catwhite, cattie } from './assets/pngs';
import { CatClockTailController } from './tail-controller';
import { CatClockEyesController } from './eyes-controller';
import { CatClockHandsController } from './hands-controller';
import { AsyncImage } from './async-image';
import CatClockTieController from './tie-controller';

export class CatClock {
  private context: CanvasRenderingContext2D;

  private catWhiteImage: AsyncImage;
  private catBackImage: AsyncImage;
  private catTieImage: AsyncImage;

  private tieController: CatClockTieController;
  private tailController: CatClockTailController;
  private eyeController: CatClockEyesController;
  private handController: CatClockHandsController;

  constructor(
    private canvas: HTMLCanvasElement,
    color: string = '#a99cef',
  ) {
    canvas.width = 150;
    canvas.height = 300;
    this.context = canvas.getContext('2d')!;

    this.tailController = new CatClockTailController();
    this.eyeController = new CatClockEyesController();
    this.handController = new CatClockHandsController();

    this.catWhiteImage = new AsyncImage(catwhite);
    this.catBackImage = new AsyncImage(catback);
    this.catTieImage = new AsyncImage(cattie);

    this.tieController = new CatClockTieController(this.catTieImage, color);

    Promise.all([this.catWhiteImage.done, this.catBackImage.done, this.catTieImage.done]).then(() => {
      this.render();
    });
  }

  private render(): void {
    const t = new Date().getTime() / 1000.0;
    this.context.reset();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    /** Draw tail first */
    this.tailController.render(t);
    this.context.drawImage(this.tailController.canvas, 0, CatClockTailController.bottomPosition);

    /** Draw the back */
    this.context.drawImage(this.catBackImage.image, 0, 0);

    /** Draw the tie */
    this.tieController.update();
    this.context.drawImage(this.tieController.canvas, 0, 0);

    /** Draw the white highlights */
    this.context.drawImage(this.catWhiteImage.image, 0, 0);

    /** Draw the eyes */
    this.eyeController.render(t * Math.PI);
    this.context.drawImage(this.eyeController.canvas, 49, 31);

    /** Draw the clock hands */
    this.handController.render();
    this.context.drawImage(this.handController.canvas, 0, 0);

    window.requestAnimationFrame(() => this.render());
  }
}
