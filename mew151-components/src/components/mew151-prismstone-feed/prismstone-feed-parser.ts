import { PrismStoneFeedItem } from './prismstone-feed-item';
import { RssFeedProvider, PrismStoneFeedProvider } from './prismstone-feed-provider';

export class PrismStoneFeedParser {
  public feedProvider: RssFeedProvider | undefined = new PrismStoneFeedProvider();

  public async parseItems(): Promise<PrismStoneFeedItem[]> {
    if (!this.feedProvider) {
      throw new Error('`feedProvider` needs to be defined to parse a feed');
    }
    const doc = await this.getXmlDocument();
    const posts = Array.from(doc.querySelectorAll('item')).map(item => new PrismStoneFeedItem(item));
    return this.getParentPostsWithChildren(posts);
  }

  private getParentPostsWithChildren(posts: PrismStoneFeedItem[]) {
    const postGuidMap = new Map<string, PrismStoneFeedItem>();
    const parentPosts: PrismStoneFeedItem[] = [];
    for (let i = posts.length - 1; i >= 0; i--) {
      const post = posts[i];
      if (post.guid) {
        postGuidMap.set(post.guid, post);
      }
      if (post.parent) {
        postGuidMap.get(post.parent)?.children.push(post);
      } else {
        parentPosts.push(post);
      }
    }
    return parentPosts;
  }

  private async getXmlDocument() {
    const feed = await this.feedProvider!.getFeedAsString();
    // The RSS feed doesn't provide xmlns definitions which the XML parser really doesn't like. Convert these to standard element names instead.
    const xmlnsProcessedFeed = feed.replace(/\b((?:[a-zA-Z]|-)+?):((?:[a-zA-Z]|-)+?)(>|\s|=)/gim, '$1-$2$3');
    return new DOMParser().parseFromString(xmlnsProcessedFeed, 'application/xml');
  }
}
