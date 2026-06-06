import { h, describe, it, render, expect } from '@stencil/vitest';
import { IPrismStoneFeedItem } from '../prismstone-feed-item';

function makePost(item: Partial<IPrismStoneFeedItem>): IPrismStoneFeedItem {
  const defaultItem: IPrismStoneFeedItem = {
    children: [],
    text: '',
    date: new Date(),
    link: '',
    images: [],
  };
  return { ...defaultItem, ...item };
}

describe('mew151-prismstone-feed', () => {
  it('renders fallback text if there are no items', async () => {
    const { root } = await render(<mew151-prismstone-feed items={[]}></mew151-prismstone-feed>);

    expect(root.shadowRoot?.querySelector('.no-feed-message')).toBeTruthy();
  });
  it('renders a post', async () => {
    const date = new Date('2026-04-28T09:00:00.656725Z');
    const correctedDate = new Date(+date + date.getTimezoneOffset() * 60 * 1000);
    const { root } = await render(<mew151-prismstone-feed items={[makePost({ text: 'Test', date: correctedDate })]}></mew151-prismstone-feed>);

    const posts = root.shadowRoot?.querySelectorAll('mew151-prismstone-post')!;
    expect(posts).toHaveLength(1);
    expect(posts[0].querySelector('.post-text')?.innerHTML).toContain('Test');
    expect(posts[0].querySelector('.post-time')?.innerHTML).toContain('2026年4月28日 09:00:00');
  });
  it('renders HTML in a post', async () => {
    const { root } = await render(<mew151-prismstone-feed items={[makePost({ text: '<strong>Potato</strong>' })]}></mew151-prismstone-feed>);

    const post = root.shadowRoot?.querySelector('mew151-prismstone-post')!;
    expect(post.querySelector('.post-text')?.innerHTML).toContain('<strong>Potato</strong>');
  });
  it('renders child posts', async () => {
    const { root } = await render(<mew151-prismstone-feed items={[makePost({ text: 'Unit', children: [makePost({ text: 'Test' })] })]}></mew151-prismstone-feed>);

    const post = root.shadowRoot?.querySelector('mew151-prismstone-post');
    expect(post?.querySelectorAll('.post-text')).toHaveLength(2);
    expect(post?.querySelectorAll('hr')).toHaveLength(1);
  });
  it('handles a content warning', async () => {
    const { root } = await render(<mew151-prismstone-feed items={[makePost({ text: 'Test', contentWarning: 'test' })]}></mew151-prismstone-feed>);

    const post = root.shadowRoot?.querySelector('mew151-prismstone-post');
    expect(post?.querySelector('details')).toBeTruthy();
    expect(post?.querySelector('details > summary')?.innerHTML).toBe('test');
    expect(post?.querySelector('details .post-text')?.innerHTML).toBe('Test');
  });
  it('attaches images', async () => {
    const { root } = await render(
      <mew151-prismstone-feed
        items={[makePost({ text: 'Lookit this', images: ['https://prismstone.test/test1.jpg', 'https://prismstone.test/test2.jpg'] })]}
      ></mew151-prismstone-feed>,
    );

    const post = root.shadowRoot?.querySelector('mew151-prismstone-post');
    expect(post?.querySelector('.image-container')).toBeTruthy();
    expect(post?.querySelectorAll('.image-container img')).toHaveLength(2);
  });
  it('fetches the feed from a feed provider', async () => {
    const { root } = await render(
      <mew151-prismstone-feed
        feedProvider={{
          async getFeedAsString() {
            return `<rss>
        <channel>
        <item>
          <description>I like potatoes.</description>
          <pubDate>2026-03-21T14:06:53.656725Z</pubDate>
          <link>https://prismstone.test/post/1</link>
          </item>
        </channel>
        </rss>`;
          },
        }}
      ></mew151-prismstone-feed>,
    );

    expect(root.shadowRoot?.querySelectorAll('mew151-prismstone-post')).toHaveLength(1);
  });
  it('shows an error message if the feed cannot be fetched', async () => {
    const { root } = await render(
      <mew151-prismstone-feed
        feedProvider={{
          async getFeedAsString() {
            throw new Error('out of cheese');
          },
        }}
      ></mew151-prismstone-feed>,
    );

    expect(root.shadowRoot?.querySelectorAll('.no-feed-message')).toHaveLength(1);
  });
});
