import { describe, expect, it } from 'vitest';
import { createImageDataFromJson } from './jsbm';

const blarg = '{"s":[16,7],"d":"EwAVAJPNVaWTxQCAAGA="}';

describe('Jsbm image format', () => {
  const expectedB = [
    [1, 1, 0],
    [1, 0, 1],
    [1, 1, 0],
    [1, 0, 1],
    [1, 1, 0],
    [0, 0, 0],
  ];
  it('creates an image with the correct dimensions', () => {
    const [dimensions, _] = createImageDataFromJson(blarg);

    expect(dimensions[0]).toBe(16);
    expect(dimensions[1]).toBe(7);
  });
  it('fills in pixels correctly', () => {
    const [_, data] = createImageDataFromJson(blarg);

    expect(data.length).toBe(16 * 7 * 4);
    for (let i = 0; i < expectedB.length; i++) {
      for (let j = 0; j < expectedB[i].length; j++) {
        const pixel = j * 4 + i * 16 * 4;
        expect(data[pixel]).toBe(0);
        expect(data[pixel + 1]).toBe(0);
        expect(data[pixel + 2]).toBe(0);
        expect(data[pixel + 3], `Expected byte ${pixel + 3} to be ${expectedB[i][j] * 255}`).toBe(255 * expectedB[i][j]);
      }
    }
  });
  it('can apply a specific color to the pixels', () => {
    const [_, data] = createImageDataFromJson(blarg, '#ffaacc');

    for (let i = 0; i < expectedB.length; i++) {
      for (let j = 0; j < expectedB[i].length; j++) {
        const pixel = j * 4 + i * 16 * 4;
        expect(data[pixel]).toBe(0xff);
        expect(data[pixel + 1]).toBe(0xaa);
        expect(data[pixel + 2]).toBe(0xcc);
        expect(data[pixel + 3], `Expected byte ${pixel + 3} to be ${expectedB[i][j] * 255}`).toBe(255 * expectedB[i][j]);
      }
    }
  });
});
