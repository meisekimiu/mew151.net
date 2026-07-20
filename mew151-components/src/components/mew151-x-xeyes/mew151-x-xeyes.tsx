import { Component, Prop, h } from '@stencil/core';
import { Xeyes } from './xeyes';

@Component({
  tag: 'mew151-x-xeyes',
  styleUrl: 'mew151-x-xeyes.css',
  shadow: true,
})
export class Mew151XXeyes {
  /** A reference to the canvas element */
  public canvas!: HTMLCanvasElement;

  /** Whether the eyes are biblically accurate or not */
  @Prop() public biblicallyAccurate: boolean = false;

  /** Whether The Residents are watching or not */
  @Prop() public theResidentsMode: boolean = false;

  /** The width of the canvas */
  @Prop()
  public get width(): number {
    return this.xeyes?.width ?? this._width;
  }
  public set width(num: number) {
    if (this.xeyes) {
      this.xeyes.width = num;
    } else {
      this._width = num;
    }
  }

  /** The height of the canvas */
  @Prop()
  public get height(): number {
    return this.xeyes?.height ?? this._height;
  }
  public set height(num: number) {
    if (this.xeyes) {
      this.xeyes.height = num;
    } else {
      this._height = num;
    }
  }

  private xeyes: Xeyes | undefined;

  private _width: number = 150;
  private _height: number = 100;

  public componentWillLoad(): void {
    setTimeout(() => {
      this.xeyes = new Xeyes(this.canvas);
      this.xeyes.biblicallyAccurate = this.biblicallyAccurate;
      this.xeyes.theResidentsMode = this.theResidentsMode;
      this.xeyes.width = this._width;
      this.xeyes.height = this._height;
      this.xeyes.init();
    });
  }

  public getAltText(): string {
    if (this.biblicallyAccurate) {
      const description = 'A cluster of ten eyes that stare at the mouse cursor and/or keyboard focus. The top row of eyes have top hats on them.';
      if (this.theResidentsMode) {
        return description + ' The top row of eyes have top hats on them.';
      }
      return description;
    }
    if (this.theResidentsMode) {
      return 'A single eyeball wearing a top hat that stares at the mouse cursor position and/or keyboard focus.';
    }
    return 'A pair of eyes that stares at the mouse cursor position and/or keyboard focus.';
  }

  render() {
    return (
      <canvas width="150" height="100" ref={elm => (this.canvas = elm!)} role="img" aria-label={this.getAltText()}>
        {this.getAltText()}
      </canvas>
    );
  }
}
