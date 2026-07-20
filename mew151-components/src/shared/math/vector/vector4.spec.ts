import { describe, expect, it } from 'vitest';
import { Vector4 } from './vector4';

describe('Vector4 Class', () => {
  it('should exist', () => {
    const v = new Vector4();
    expect(v.length).toBe(4);
  });
  it('can clone itself', () => {
    const v = new Vector4([1, 2, 3, 4]);
    const w = v.clone();
    expect(w[0]).toBe(1);
    expect(w[1]).toBe(2);
    expect(w[2]).toBe(3);
  });
  it('can be converted to string', () => {
    const v = new Vector4([1, 2, 3, 4]);
    expect(v.toString()).toBe('Vector4(1, 2, 3, 4)');
  });
});
