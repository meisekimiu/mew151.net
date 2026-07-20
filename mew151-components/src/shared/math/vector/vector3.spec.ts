import { describe, expect, it } from 'vitest';
import { Vector3 } from './vector3';

describe('Vector3 Class', () => {
  it('should exist', () => {
    const v = new Vector3();
    expect(v.length).toBe(3);
  });
  it('can clone itself', () => {
    const v = new Vector3([1, 2, 3]);
    const w = v.clone();
    expect(w[0]).toBe(1);
    expect(w[1]).toBe(2);
    expect(w[2]).toBe(3);
  });
  it('can be converted to string', () => {
    const v = new Vector3([1, 2, 3]);
    expect(v.toString()).toBe('Vector3(1, 2, 3)');
  });
});
