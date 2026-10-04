import { h, describe, it, render, expect } from '@stencil/vitest';

describe('mew151-rss-date-calculator', () => {
  function getInputAndOutput(root: HTMLElement): { input: HTMLInputElement; output: HTMLElement } {
    return { input: root.shadowRoot!.querySelector('.input-date')!, output: root.shadowRoot!.querySelector('.output')! };
  }
  it('renders', async () => {
    const { root } = await render(<mew151-rss-date-calculator></mew151-rss-date-calculator>);

    expect(root).toBeTruthy();
  });
  it('can convert a date to RFC 822', async () => {
    const { root, waitForChanges } = await render(<mew151-rss-date-calculator></mew151-rss-date-calculator>);

    const { input, output } = getInputAndOutput(root);
    expect(input).toBeTruthy();
    expect(output).toBeTruthy();

    input.value = '2026-10-03 12:50:26';
    input.dispatchEvent(new Event('change'));
    await waitForChanges();

    expect(output.textContent).toContain('Sat, 03 Oct 2026 12:50:26');
  });
  it('shows an error message if the input is invalid', async () => {
    const { root, waitForChanges } = await render(<mew151-rss-date-calculator></mew151-rss-date-calculator>);

    const { input, output } = getInputAndOutput(root);
    input.value = 'potato';
    input.dispatchEvent(new Event('change'));
    await waitForChanges();

    expect(output.textContent).toBe('Invalid date!');
  });
  it('has a button that can get the current time', async () => {
    const { root, waitForChanges } = await render(<mew151-rss-date-calculator newDateProvider={() => new Date('2026-10-03 13:45:03')}></mew151-rss-date-calculator>);

    const currentDateButton: HTMLButtonElement = root.shadowRoot!.querySelector('.current-date-button')!;
    expect(currentDateButton).toBeTruthy();
    currentDateButton.dispatchEvent(new Event('click'));
    await waitForChanges();

    const { input, output } = getInputAndOutput(root);
    expect(input.value).toContain('2026-10-03');
    expect(output.textContent).toContain('Sat, 03 Oct 2026 13:45:03');
  });
  it.each([
    [420, '-0700'],
    [-420, '+0700'],
    [-330, '+0530'],
    [0, 'GMT'],
  ])('displays the local timezone offset correctly: %d = %s', async (offset, expected) => {
    const { root, waitForChanges } = await render(<mew151-rss-date-calculator forced-timezone-offset={offset}></mew151-rss-date-calculator>);
    await waitForChanges();

    const { input, output } = getInputAndOutput(root);
    input.value = '2026-10-03 12:50:26';
    input.dispatchEvent(new Event('change'));
    await waitForChanges();

    expect(output.textContent).toContain(`Sat, 03 Oct 2026 12:50:26 ${expected}`);
  });
  it('adds 00:00:00 to the date if you do not include the time', async () => {
    const { root, waitForChanges } = await render(<mew151-rss-date-calculator forced-timezone-offset={420}></mew151-rss-date-calculator>);

    const { input, output } = getInputAndOutput(root);
    input.value = '2026-10-04';
    input.dispatchEvent(new Event('change'));
    await waitForChanges();
    const noTimeOutput = output.textContent;

    input.value = '2026-10-04 00:00:00';
    input.dispatchEvent(new Event('change'));
    await waitForChanges();

    expect(output.textContent).toBe(noTimeOutput);
  });
});
