# mew151-prismstone-feed



<!-- Auto Generated Below -->


## Overview

Renders my fediverse feed fetched from an RSS feed.

## Properties

| Property       | Attribute | Description                                                                                                        | Type                    | Default                        |
| -------------- | --------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------- | ------------------------------ |
| `feedProvider` | --        | The feed provider. This is mainly used for injecting a mock feed provider for testing.                             | `RssFeedProvider`       | `new PrismStoneFeedProvider()` |
| `items`        | --        | Items to render. If not provided, then the component will fetch a feed with the default Prism Stone Feed Provider. | `IPrismStoneFeedItem[]` | `undefined`                    |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
