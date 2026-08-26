/**
 * Imported from the "Adagio2" game engine used for my games Extreme Tax Masters, Virtual Vacation Zone, and more. :)
 */
export default class Color {
  public static readonly White: Color = new Color(255, 255, 255);
  public static readonly Black: Color = new Color(0, 0, 0);
  public static readonly Red: Color = new Color(255, 0, 0);
  public static readonly Green: Color = new Color(0, 255, 0);
  public static readonly Blue: Color = new Color(0, 0, 255);
  public r: number = 0;
  public g: number = 0;
  public b: number = 0;
  public a: number = 0;
  constructor(r: number | string, g: number = 0, b: number = 0, a: number = 255) {
    if (typeof r === 'string') {
      const color = r as string;
      if (color.match(/^#[0-9a-fA-F]+$/)) {
        if (color.length === 4) {
          this.r = parseInt(color.charAt(1).repeat(2), 16);
          this.g = parseInt(color.charAt(2).repeat(2), 16);
          this.b = parseInt(color.charAt(3).repeat(2), 16);
          this.a = 255;
        } else if (color.length === 5) {
          this.r = parseInt(color.charAt(1).repeat(2), 16);
          this.g = parseInt(color.charAt(2).repeat(2), 16);
          this.b = parseInt(color.charAt(3).repeat(2), 16);
          this.a = parseInt(color.charAt(4).repeat(2), 16);
        } else if (color.length === 7) {
          this.r = parseInt(color.substr(1, 2), 16);
          this.g = parseInt(color.substr(3, 2), 16);
          this.b = parseInt(color.substr(5, 2), 16);
          this.a = 255;
        } else if (color.length === 9) {
          this.r = parseInt(color.substr(1, 2), 16);
          this.g = parseInt(color.substr(3, 2), 16);
          this.b = parseInt(color.substr(5, 2), 16);
          this.a = parseInt(color.substr(7, 2), 16);
        } else {
          throw new RangeError('Input is not a valid HTML hex color');
        }
      }
    } else {
      this.r = r as number;
      this.g = g;
      this.b = b;
      this.a = a;
    }
  }
  get red(): number {
    return Math.max(0, Math.min(255, Math.floor(this.r)));
  }
  set red(r: number) {
    this.r = Math.max(0, Math.min(255, r));
  }
  get green(): number {
    return Math.max(0, Math.min(255, Math.floor(this.g)));
  }
  set green(x: number) {
    this.g = Math.max(0, Math.min(255, x));
  }
  get blue(): number {
    return Math.max(0, Math.min(255, Math.floor(this.b)));
  }
  set blue(x: number) {
    this.b = Math.max(0, Math.min(255, x));
  }
  get alpha(): number {
    return Math.max(0, Math.min(255, Math.floor(this.a)));
  }
  set alpha(x: number) {
    this.a = Math.max(0, Math.min(255, x));
  }
  public toHex(): string {
    return `#${this.red.toString(16).padStart(2, '0')}${this.green.toString(16).padStart(2, '0')}${this.blue.toString(16).padStart(2, '0')}${this.alpha < 255 ? this.alpha.toString(16).padStart(2, '0') : ''}`;
  }
  public toHexNumber(): number {
    return this.red * 0x10000 + this.g * 0x100 + this.b;
  }
}
