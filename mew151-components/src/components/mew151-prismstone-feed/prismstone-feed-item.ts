export interface IPrismStoneFeedItem {
  children: IPrismStoneFeedItem[];
  text: string;
  date: Date;
  link: string;
  contentWarning?: string;
  images: string[];
  guid?: string;
  parent?: string;
}

/**
 * Transforms an `<item>` element into a data structure with relevant information about a Prism Stone post.
 */
export class PrismStoneFeedItem implements IPrismStoneFeedItem {
  /** Replies to this post */
  public children: IPrismStoneFeedItem[] = [];

  private descriptions: Element[];

  constructor(private item: Element) {
    this.descriptions = Array.from(item.querySelectorAll('description'));
  }

  /** The text of the post */
  public get text(): string {
    return this.parseEmojis(this.item, this.removeHtmlEntities(this.descriptions[0]?.innerHTML ?? ''));
  }

  /** The publish date of the post */
  public get date(): Date {
    return new Date(this.item.querySelector('pubDate')?.innerHTML ?? '');
  }

  /** A permalink to the post */
  public get link(): string {
    return this.item.querySelector('link')?.innerHTML ?? '';
  }

  /** An optional content warning for the post */
  public get contentWarning(): string | undefined {
    return this.descriptions[1]?.innerHTML;
  }

  /** Attached images to the post */
  public get images(): string[] {
    return Array.from(this.item.querySelectorAll("link[type^='image']")).map(element => element.innerHTML);
  }

  public get parent(): string | undefined {
    return this.item.querySelector('thr-in-reply-to')?.getAttribute('href') ?? undefined;
  }

  public get guid(): string | undefined {
    return this.item.querySelector('guid')?.innerHTML;
  }

  private parseEmojis(item: Element, text: string): string {
    const emojiData = Array.from(item.querySelectorAll('link[rel="emoji"]')).map(element => ({
      name: element.getAttribute('name'),
      url: element.innerHTML,
    }));
    return emojiData.reduce((replacedText, emoji) => {
      const emojiCode = `:${emoji.name}:`;
      const img = document.createElement('img');
      img.className = 'emoji';
      img.src = emoji.url;
      img.alt = emojiCode;
      return replacedText.replaceAll(emojiCode, img.outerHTML);
    }, text);
  }

  private removeHtmlEntities(text: string): string {
    const replacedEntities: [string, string][] = [
      ['&lt;', '<'],
      ['&gt;', '>'],
      ['&quot;', '"'],
    ];
    return replacedEntities.reduce((replacedText, entityData) => {
      return replacedText.replaceAll(...entityData);
    }, text);
  }
}
