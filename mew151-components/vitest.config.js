import { defineVitestConfig } from '@stencil/vitest/config';

export default defineVitestConfig({
  stencilConfig: './stencil.config.ts',
  test: {
    projects: [
      // Spec tests - via a node DOM of your choice
      {
        test: {
          name: 'spec',
          include: ['src/**/*.spec.{ts,tsx}'],
          environment: 'jsdom',
          setupFiles: ['./vitest-setup.ts'],
        },
      },
    ],
  },
});
