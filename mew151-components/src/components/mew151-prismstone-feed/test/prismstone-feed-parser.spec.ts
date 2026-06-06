import { PrismStoneFeedParser } from '../prismstone-feed-parser';
import { describe, beforeEach, it, expect } from 'vitest';

describe('Prism Stone Feed Parser', () => {
  let parser: PrismStoneFeedParser;
  function setFeedItems(items: string): void {
    parser.feedProvider = {
      async getFeedAsString() {
        return `<rss>
        <channel>
          ${items}
        </channel>
        </rss>`;
      },
    };
  }
  beforeEach(() => {
    parser = new PrismStoneFeedParser();
  });
  it('throws an error if no feedProvider is provided', async () => {
    parser.feedProvider = undefined;

    await expect(parser.parseItems).rejects.toThrow();
  });
  it('can get a basic post item', async () => {
    setFeedItems(`<item>
      <description>I like potatoes.</description>
      <pubDate>2026-03-21T14:06:53.656725Z</pubDate>
      <link>https://prismstone.test/post/1</link>
    </item>`);
    const items = await parser.parseItems();

    expect(items).toHaveLength(1);
    expect(items[0].text).toBe('I like potatoes.');

    expect(items[0].date.getFullYear()).toBe(2026);
    expect(items[0].date.getMonth()).toBe(2);
    expect(items[0].date.getDate()).toBe(21);
    expect(items[0].date.getHours() + items[0].date.getTimezoneOffset() / 60).toBe(14);
    expect(items[0].date.getMinutes() + (items[0].date.getTimezoneOffset() % 60)).toBe(6);
    expect(items[0].date.getSeconds()).toBe(53);

    expect(items[0].link).toBe('https://prismstone.test/post/1');

    expect(items[0].contentWarning).toBeFalsy();
    expect(items[0].images).toHaveLength(0);
  });
  it('can get content warning text', async () => {
    setFeedItems(`<item>
      <description>I like potatoes.</description>
      <pubDate>2026-03-21T14:06:53.656725Z</pubDate>
      <link>https://prismstone.test/post/1</link>
      <description>food</description>
    </item>`);

    const items = await parser.parseItems();
    expect(items[0].text).toBe('I like potatoes.');
    expect(items[0].contentWarning).toBe('food');
  });
  it('can get HTML text', async () => {
    setFeedItems(`<item>
      <description>&lt;p class=&quot;test&quot;&gt;I like potatoes.&lt;/p&gt;</description>
      <pubDate>2026-03-21T14:06:53.656725Z</pubDate>
      <link>https://prismstone.test/post/1</link>
    </item>`);

    const items = await parser.parseItems();
    expect(items[0].text).toBe('<p class="test">I like potatoes.</p>');
  });
  it('can have attached images', async () => {
    setFeedItems(`<item>
      <link type="image/jpeg">https://prismstone.test/potato.jpg</link>
      <link type="image/jpeg">https://prismstone.test/tomato.jpg</link>
    </item>`);

    const items = await parser.parseItems();
    expect(items[0].images).toHaveLength(2);
    expect(items[0].images[0]).toBe('https://prismstone.test/potato.jpg');
    expect(items[0].images[1]).toBe('https://prismstone.test/tomato.jpg');
  });
  it('can parse emojis', async () => {
    setFeedItems(`<item>
      <description>Test :potato:</description>
      <link name="potato" rel="emoji">https://prismstone.test/potato.jpg</link>
    </item>`);

    const items = await parser.parseItems();
    const container = document.createElement('div');
    container.innerHTML = items[0].text;

    expect(container.childNodes.length).toBe(2);
    expect(container.childNodes[0].textContent).toBe('Test ');

    const emojiImg = container.querySelector('img')!;

    expect(emojiImg).toBeDefined();
    expect(emojiImg.className).toBe('emoji');
    expect(emojiImg.src).toBe('https://prismstone.test/potato.jpg');
    expect(emojiImg.alt).toBe(':potato:');
  });
  it('appends replies to their parent posts', async () => {
    setFeedItems(`<item>
      <description>Potato</description>
      <pubDate>2026-06-04T18:31:53.656725Z</pubDate>
      <thr:in-reply-to ref="https://prismstone.test/12345" href="https://prismstone.test/12345" />
    </item>
    <item>
      <guid>https://prismstone.test/12345</guid>
      <pubDate>2026-03-21T14:06:53.656725Z</pubDate>
      <description>Test</description>
    </item>
    `);

    const items = await parser.parseItems();
    expect(items).toHaveLength(1);

    expect(items[0].children).toHaveLength(1);
    expect(items[0].text).toBe('Test');
    expect(items[0].children[0].text).toBe('Potato');
  });
});
