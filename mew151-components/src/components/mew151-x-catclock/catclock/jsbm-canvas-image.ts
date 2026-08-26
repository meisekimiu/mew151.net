import { createImageDataFromJson } from '../jsbm/jsbm';

export class JsbmCanvasImage {
  public canvas: HTMLCanvasElement;

  private context: CanvasRenderingContext2D;

  constructor(asset: string, color: string = '#000') {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d')!;

    this.putImageData(asset, color);
  }

  private putImageData(asset: string, color: string = '#000'): void {
    const [dims, data] = createImageDataFromJson(asset, color);
    this.canvas.width = dims[0];
    this.canvas.height = dims[1];
    const imageData = this.context.createImageData(this.roundUpToNearestByteSize(dims[0]), this.roundUpToNearestByteSize(dims[1]), {
      colorSpace: 'srgb',
      // @ts-ignore
      pixelFormat: 'rgba-unorm8',
    });
    for (let i = 0; i < imageData.data.length; i++) {
      imageData.data[i] = data[i];
    }

    this.context.putImageData(imageData, 0, 0);
  }

  private roundUpToNearestByteSize(num: number): number {
    return Math.ceil(num / 8) * 8;
  }
}
