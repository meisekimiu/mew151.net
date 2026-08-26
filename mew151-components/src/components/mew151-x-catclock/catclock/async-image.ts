export class AsyncImage {
  public image: HTMLImageElement;
  public done: Promise<void>;

  constructor(source: string) {
    this.image = document.createElement('img');
    this.done = new Promise<void>((resolve, reject) => {
      this.image.onload = () => resolve();
      this.image.onerror = () => reject();
      this.image.src = source;
    });
  }
}
