# Portfolio

This is my professional Game Development portfolio. It exists here as an extra "sub-site" whose source code is included with the main site, although it is actually deployed separately and not hosted on the mew151.net server.

## Environment File

This website currently uses functionality that the rest of the site doesn't use in the build process: HTML Templates. Currently there isn't a "real" template engine being used. Instead, a basic regular expression is evaluated on `.html.template` files that injects environment variables into the document.

To properly build this site, you must copy the `.env.template` file to `.env` and fill out the proper environment variables.

## Building

Because it is part of the larger project, the build process from the rest of the site compiles this site as well:

```
npm install
npm run build
```

And you can use the watch command for local development:

```
npm run build:watch
```
