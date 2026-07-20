import { Vector } from './vector';
import { ZeroMagnitudeError } from './errors';

export function addVectors<T extends Vector>(a: T, b: T, output?: T): T {
  const outputVector = output ?? a.$getScratch();
  for (let i = 0; i < a.length; i++) {
    outputVector[i] = a[i] + b[i];
  }
  return outputVector;
}

export function assignVector<T extends Vector>(target: T, value: T | number[]): void {
  for (let i = 0; i < target.length; i++) {
    // eslint-disable-next-line no-param-reassign
    target[i] = value[i];
  }
}

export function scaleVector<T extends Vector>(a: T, scalar: number, output?: T): T {
  const outputVector = output ?? a.$getScratch();
  for (let i = 0; i < a.length; i++) {
    outputVector[i] = a[i] * scalar;
  }
  return outputVector;
}

export function subtractVectors<T extends Vector>(minuend: T, subtrahend: T, output?: T): T {
  return addVectors(minuend, scaleVector(subtrahend, -1), output);
}

export function clampVector<T extends Vector>(vector: T, min: T, max: T, output?: T): T {
  const outputVector = output ?? vector.$getScratch();
  for (let i = 0; i < vector.length; i++) {
    outputVector[i] = Math.min(Math.max(vector[i], min[i]), max[i]);
  }
  return outputVector;
}

export function floorVector<T extends Vector>(v: T, output?: T): T {
  const outputVector = output ?? v.$getScratch();
  for (let i = 0; i < v.length; i++) {
    outputVector[i] = Math.floor(v[i]);
  }
  return outputVector;
}

export function ceilVector<T extends Vector>(v: T, output?: T): T {
  const outputVector = output ?? v.$getScratch();
  for (let i = 0; i < v.length; i++) {
    outputVector[i] = Math.ceil(v[i]);
  }
  return outputVector;
}

export function divideVector<T extends Vector>(v: T, scalar: number, output?: T): T {
  const outputVector = output ?? v.$getScratch();
  for (let i = 0; i < v.length; i++) {
    outputVector[i] = v[i] / scalar;
  }
  return outputVector;
}

export function dot<T extends Vector>(a: T, b: T): number {
  let product = 0;
  for (let i = 0; i < a.length; i++) {
    product += a[i] * b[i];
  }
  return product;
}

export function magnitude<T extends Vector>(v: T): number {
  return Math.sqrt(dot(v, v));
}

export function normalize<T extends Vector>(v: T, output?: T): T {
  const outputVector = output ?? v.$getScratch();
  const norm = magnitude(v);
  if (norm === 0) {
    throw new ZeroMagnitudeError('Cannot normalize a vector with magnitude 0');
  }
  for (let i = 0; i < v.length; i++) {
    outputVector[i] = v[i] / norm;
  }
  return outputVector;
}

export function vectorEquals<T extends Vector>(a: T, b: T): boolean {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
