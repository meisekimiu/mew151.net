import { newSpecPage } from '@stencil/core/testing';
import { Mew151Mew } from '../mew151-mew';
import { h } from '@stencil/core';

describe('mew151-mew', () => {
  function expectImageSourceToBe(received: HTMLImageElement, src: string): void {
    const element = document.createElement('img');
    element.src = src;

    expect(received.src).toBe(element.src);
  }
  it('renders an image', async () => {
    const { root } = await newSpecPage({
      components: [Mew151Mew],
      template: () => <mew151-mew src="test.png" isShiny={() => false}></mew151-mew>,
    });

    expect(root.shadowRoot.querySelector('img')).toBeTruthy();
    expectImageSourceToBe(root.shadowRoot.querySelector('img'), 'test.png');
  });
  it('can be passed alt text', async () => {
    const { root } = await newSpecPage({
      components: [Mew151Mew],
      template: () => <mew151-mew src="test.png" alt="Unit Test"></mew151-mew>,
    });

    expect(root.shadowRoot.querySelector('img').getAttribute('alt')).toBe('Unit Test');
  });
  it('can have a random chance to generate a shiny sprite', async () => {
    const isShiny = () => true;
    const { root } = await newSpecPage({
      components: [Mew151Mew],
      template: () => <mew151-mew src="test.png" alt="Unit Test" isShiny={isShiny}></mew151-mew>,
    });

    expectImageSourceToBe(root.shadowRoot.querySelector('img'), 'test_s.png');
  });
});
