/** @type {import('jest-environment-puppeteer').JestPuppeteerConfig} */
module.exports = {
  server: {
    command: "npm run test-dev-server",
    port: process.env.PORT ?? 8081,
  },
};
