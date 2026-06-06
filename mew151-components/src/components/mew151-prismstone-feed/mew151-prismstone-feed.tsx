import { Component, Fragment, Prop, h } from '@stencil/core';
import { IPrismStoneFeedItem } from './prismstone-feed-item';
import { PrismStoneFeedProvider, RssFeedProvider } from './prismstone-feed-provider';
import { PrismStoneFeedParser } from './prismstone-feed-parser';

/**
 * Renders my fediverse feed fetched from an RSS feed.
 */
@Component({
  tag: 'mew151-prismstone-feed',
  styleUrl: 'mew151-prismstone-feed.css',
  shadow: true,
})
export class Mew151PrismstoneFeed {
  /**
   * Items to render. If not provided, then the component will fetch a feed with the default Prism Stone Feed Provider.
   */
  @Prop({ mutable: true }) public items: IPrismStoneFeedItem[] | undefined = undefined;

  /**
   * The feed provider. This is mainly used for injecting a mock feed provider for testing.
   */
  @Prop() public feedProvider: RssFeedProvider = new PrismStoneFeedProvider();

  async componentWillLoad() {
    if (typeof this.items !== 'undefined') {
      return;
    }
    const parser = new PrismStoneFeedParser();
    parser.feedProvider = this.feedProvider;
    try {
      this.items = (await parser.parseItems()).reverse();
    } catch {
      this.items = [];
    }
  }

  render() {
    if (typeof this.items !== 'undefined' && this.items.length === 0) {
      return (
        <div class="no-feed-message">
          Couldn't fetch my fediverse feed. Follow me at <a href="https://prismst.one/natalie">@natalie@prismst.one</a>!
        </div>
      );
    } else if (typeof this.items === 'undefined') {
      return <div class="loading">Loading my Fediverse feed...</div>;
    }
    const posts = this.items!.map(item => {
      return (
        <mew151-prismstone-post>
          <time class="post-time">{this.formatDate(item.date)}</time>
          {this.getPostText(item)}
          {this.getChildPosts(item)}
        </mew151-prismstone-post>
      );
    });
    return <div class="prism-stone-feed">{posts}</div>;
  }

  private getChildPosts(item: IPrismStoneFeedItem) {
    return this.flattenItemChildren(item)
      .map(this.getPostText.bind(this))
      .flatMap(div => [<hr />, div]);
  }

  private getImages(item: IPrismStoneFeedItem) {
    if (item.images.length === 0) {
      return <Fragment />;
    }
    return (
      <div class="image-container">
        {item.images.map(img => (
          <a href={img} target="_blank">
            <img
              src={img}
              alt="An image attached to the post. Unfortunately, alt text isn't being returned by the feed, so you'll have to view the original post to get alt text. Sorry!"
            />
          </a>
        ))}
      </div>
    );
  }

  private getPostText(item: IPrismStoneFeedItem) {
    const div = (
      <Fragment>
        <div class="post-text" innerHTML={item.text}></div>
        {this.getImages(item)}
      </Fragment>
    );
    if (item.contentWarning) {
      return (
        <details>
          <summary>{item.contentWarning}</summary>
          {div}
        </details>
      );
    }
    return div;
  }

  private flattenItemChildren(item: IPrismStoneFeedItem): IPrismStoneFeedItem[] {
    return item.children.flatMap(child => [child, this.flattenItemChildren(child)]).flat();
  }

  private formatDate(date: Date): string {
    return `${this.getDateString(date)} ${this.getTimeString(date)}`;
  }

  private getDateString(date: Date): string {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  }

  private getTimeString(date: Date): string {
    const leftPad = (val: number): string => val.toString().padStart(2, '0');
    return `${leftPad(date.getHours())}:${leftPad(date.getMinutes())}:${leftPad(date.getSeconds())}`;
  }
}
