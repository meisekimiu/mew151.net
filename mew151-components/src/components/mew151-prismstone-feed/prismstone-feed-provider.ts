export interface RssFeedProvider {
  getFeedAsString(): Promise<string>;
}

export class PrismStoneFeedProvider implements RssFeedProvider {
  public async getFeedAsString(): Promise<string> {
    const response = await fetch('https://prismst.one/users/natalie/feed.rss');
    return await response.text();
  }
}
