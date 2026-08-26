import Color from '../../../shared/color/color';
import { Vector2 } from '../../../shared/math/vector';
import { JsbmImage } from './jsbm-image';

export function createImageDataFromJson(json: string, colorString: string = '#000'): [Vector2, Uint8ClampedArray] {
  const imageData = JSON.parse(json);
  if (!isJsbmFormat(imageData)) {
    throw new Error('Invalid image format');
  }
  const size: Vector2 = new Vector2(imageData.s);
  const color = new Color(colorString);
  const bytes = Array.from(uInt8ArrayFromBase64(imageData.d))
    .flatMap(n => [n & 128, n & 64, n & 32, n & 16, n & 8, n & 4, n & 2, n & 1].reverse().map(n => +!!n))
    .flatMap(bit => [color.r, color.g, color.b, 255 * bit]);
  return [size, new Uint8ClampedArray(bytes)];
}

function uInt8ArrayFromBase64(code: string): Uint8Array {
  // @ts-ignore
  if (typeof Uint8Array['fromBase64'] === 'function') {
    // @ts-ignore
    return Uint8Array['fromBase64'](code);
  } else {
    return new Uint8Array(
      atob(code)
        .split('')
        .map(c => c.charCodeAt(0)),
    );
  }
}

export function isJsbmFormat(obj: unknown): obj is JsbmImage {
  const object = obj as any;
  if (typeof object['s'] === 'undefined') {
    return false;
  }
  const sizeVector = object['s'];
  return typeof sizeVector === 'object' && typeof sizeVector[0] === 'number' && typeof sizeVector[1] === 'number' && typeof object['d'] === 'string';
}
