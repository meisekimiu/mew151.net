# mew151-mew



<!-- Auto Generated Below -->


## Overview

Component for the Mew sprites on the Mew151.net homepage. This handles the logic to swap out the image with the "shiny" equivalent sprite if the user is lucky enough.

## Properties

| Property  | Attribute | Description                                          | Type            | Default                           |
| --------- | --------- | ---------------------------------------------------- | --------------- | --------------------------------- |
| `alt`     | `alt`     | Alt text to apply to the sprite.                     | `string`        | `undefined`                       |
| `isShiny` | --        | RNG function to determine if the Mew sprite is Shiny | `() => boolean` | `() => this.calculateShinyOdds()` |
| `src`     | `src`     | The image source to be passed in.                    | `string`        | `undefined`                       |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
