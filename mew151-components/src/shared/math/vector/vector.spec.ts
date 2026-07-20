import { describe, expect, it } from 'vitest';
import { Vector } from './vector';

describe('Vector Class', () => {
  it('should exist', () => {
    const v = new Vector();
    expect(v.length).toBe(1);
  });
  it('can be initialized with an arbitrarily sized array', () => {
    const v = new Vector([0, 1, 2, 3, 4, 5]);
    expect(v.length).toBe(6);
  });
  it('can be initialized with an arbitrary dimension', () => {
    const v = new Vector(undefined, 50);
    expect(v.length).toBe(50);
  });
  it('can clone itself', () => {
    const v = new Vector([0, 1, 2, 3]);
    const w = v.clone();
    v[0] = 3;
    v[1] = 2;
    v[2] = 1;
    v[3] = 0;
    const [a, b, c, d] = w;
    expect(a).toBe(0);
    expect(b).toBe(1);
    expect(c).toBe(2);
    expect(d).toBe(3);
  });
  it('can be converted to string', () => {
    const v = new Vector([0, 1, 2, 3]);
    expect(v.toString()).toBe('Vector(0, 1, 2, 3)');
  });
});
