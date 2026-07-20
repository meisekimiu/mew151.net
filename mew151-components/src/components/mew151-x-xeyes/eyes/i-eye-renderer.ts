import { Matrix3 } from '../../../shared/math/matrix/matrix3';
import { Eye } from './eye';

export interface EyeRenderer {
  setTransform(matrix: Matrix3): void;
  drawEyes(eyes: Eye[]): void;
  clear(): void;
}
