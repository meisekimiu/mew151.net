import { AsyncImage } from './async-image';

export default class CatClockTieController {
  public canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  private hue: number = 0;

  constructor(
    private tieImage: AsyncImage,
    private color: string = '#a99cef',
  ) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 150;
    this.canvas.height = 300;
    this.context = this.canvas.getContext('2d')!;

    this.tieImage.done.then(() => {
      this.colorizeTie();
    });
  }

  private colorizeTie(): void {
    this.context.reset();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.color === 'transgender') {
      this.context.fillStyle = '#fff';
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.fillStyle = '#5BCEFA';
      this.context.fillRect(33, 85, 87, 4);
      this.context.fillRect(33, 101, 87, 4);
      this.context.fillStyle = '#F5A9B8';
      this.context.fillRect(33, 89, 87, 4);
      this.context.fillRect(33, 97, 87, 4);
    } else if (this.color === 'asexual') {
      this.context.fillStyle = '#fff';
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.fillStyle = '#000';
      this.context.fillRect(33, 85, 87, 5);
      this.context.fillStyle = '#A3A3A3';
      this.context.fillRect(33, 90, 87, 5);
      this.context.fillStyle = '#800080';
      this.context.fillRect(33, 100, 87, 5);
    } else if (this.color === 'lesbian') {
      this.context.fillStyle = '#fff';
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.fillStyle = '#D52D00';
      this.context.fillRect(33, 85, 87, 3);
      this.context.fillStyle = '#EF7627';
      this.context.fillRect(33, 88, 87, 3);
      this.context.fillStyle = '#FF9A56';
      this.context.fillRect(33, 90, 87, 3);

      this.context.fillStyle = '#D162A4';
      this.context.fillRect(33, 96, 87, 3);
      this.context.fillStyle = '#B55690';
      this.context.fillRect(33, 99, 87, 3);
      this.context.fillStyle = '#A30262';
      this.context.fillRect(33, 102, 87, 3);
    } else if (this.color === 'pride') {
      this.context.fillStyle = '#fff';
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.fillStyle = '#E40303';
      this.context.fillRect(33, 85, 87, 4);
      this.context.fillStyle = '#FF8C00';
      this.context.fillRect(33, 89, 87, 3);
      this.context.fillStyle = '#FFED00';
      this.context.fillRect(33, 92, 87, 3);
      this.context.fillStyle = '#008026';
      this.context.fillRect(33, 95, 87, 3);
      this.context.fillStyle = '#004CFF';
      this.context.fillRect(33, 98, 87, 3);
      this.context.fillStyle = '#732982';
      this.context.fillRect(33, 101, 87, 4);
    } else if (this.color === 'rainbow') {
      this.context.fillStyle = 'hsl(' + this.hue + ', 100%, 75%)';
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    } else {
      this.context.fillStyle = this.color;
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    this.context.globalCompositeOperation = 'destination-in';
    this.context.drawImage(this.tieImage.image, 0, 0);
  }

  public update(): void {
    if (this.color === 'rainbow') {
      this.hue = (new Date().getTime() / 60) % 360;
      this.colorizeTie();
    }
  }
}
