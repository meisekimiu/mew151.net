import { Component, Prop, h } from '@stencil/core';

/**
 * Component for the Mew sprites on the Mew151.net homepage. This handles the logic to swap out the image with the "shiny" equivalent sprite if the user is lucky enough.
 */
@Component({
  tag: 'mew151-mew',
  styleUrl: 'mew151-mew.css',
  shadow: true,
})
export class Mew151Mew {
  /**
   * The image source to be passed in.
   */
  @Prop() public src: string;

  /**
   * Alt text to apply to the sprite.
   */
  @Prop() public alt: string;

  /**
   * RNG function to determine if the Mew sprite is Shiny
   */
  @Prop() public isShiny: () => boolean = () => this.calculateShinyOdds();

  private calculateShinyOdds(): boolean {
    const shinyCap = (window as any)['specialDay'] ? 100 : 4096;
    const isShiny = Math.floor(Math.random() * shinyCap) === 97;
    if (isShiny) {
      console.log('*sparkle*');
    }
    return isShiny;
  }

  private getImageSrc(): string {
    return this.isShiny() ? this.src.replace(/\.png$/, '_s.png') : this.src;
  }

  public render() {
    return <img src={this.getImageSrc()} alt={this.alt} />;
  }
}
