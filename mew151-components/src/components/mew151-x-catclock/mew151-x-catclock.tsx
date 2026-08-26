import { Component, h, Prop } from '@stencil/core';
import { CatClock } from './catclock/catclock';

/**
 * A cat clock, based on xclock's cat display mode.
 */
@Component({
  tag: 'mew151-x-catclock',
  styleUrl: 'mew151-x-catclock.css',
  shadow: true,
})
export class Mew151XCatClock {
  /** A reference to the canvas element */
  public canvas!: HTMLCanvasElement;

  private catclock: CatClock | undefined;

  /**
   * The color of the bowtie to display. Accepts any valid CSS colors, and possibly a few bonus ones.
   */
  @Prop() public color: string = '#a99cef';

  public componentWillLoad(): void {
    setTimeout(() => {
      this.catclock = new CatClock(this.canvas, this.color);
      this.catclock;
    });
  }

  render() {
    return (
      <canvas
        width="150"
        height="300"
        ref={elm => (this.canvas = elm!)}
        role="img"
        aria-label="An analog clock shaped like a cat that swings its tail like a pendulum. It shows the current time accurately."
      ></canvas>
    );
  }
}
