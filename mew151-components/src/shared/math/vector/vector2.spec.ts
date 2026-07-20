import { describe, expect, it } from 'vitest';
import { Vector2 } from './vector2';

describe('Vector2 Class', () => {
  it('should exist', () => {
    const v = new Vector2();
    expect(v.length).toBe(2);
  });
  it('can clone itself', () => {
    const v = new Vector2([1, 2]);
    const w = v.clone();
    expect(w[0]).toBe(1);
    expect(w[1]).toBe(2);
  });
  it('can be converted to string', () => {
    const v = new Vector2([1, 2]);
    expect(v.toString()).toBe('Vector2(1, 2)');
  });
});
