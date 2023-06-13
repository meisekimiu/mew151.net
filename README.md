# mew151.net

This is my personal website. :)

[<img alt="Deployed with FTP Deploy Action" src="https://img.shields.io/badge/Deployed With-FTP DEPLOY ACTION-%3CCOLOR%3E?style=for-the-badge&color=0077b6">](https://github.com/SamKirkland/FTP-Deploy-Action)

## Building / Development

This website uses Sass and TypeScript in places for styles and scripting. To actually build the website for deployment, you have to build it with npm:

```
npm install
npm run build
```

For local development, instead of running the build step manually every time you change a script file, you can instead run a watch script that will compile whenever you make changes. You can run it with this npm command:

```
npm run build:watch
```

A dev server is also provided so this site can be properly tested on the root of a domain. You can run it with:

```
npm run start
```

And the site should open in your browser.

## About Commit Messages

I'm using a utility to generate my site's RSS history via my Git history, so my commit messages are more verbose than standard commit messages. In most of my personal projects my commit messages are stuff like "skldjflkasjfl" anyway, so this is actually an improvement.

## Dependency Security Policy

This website is just a static HTML website. It is not a web application. It does not have any function besides loading in layout and things like RSS and the Journal. As a result, I have disabled Dependabot Security Alerts on this repository because:

1. It's a static website.
2. Basically all of these security alerts are going to be on dependencies only needed for the deployment process. In other wordss, code that's not even going out to the browser.

Usually I'm at least a little bit stricter on security alerts, but this is a personal project that's made just for fun and I don't want to be pestered with security alerts for it.

## License

This work is licensed under a
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License][cc-by-nc-sa].

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg
