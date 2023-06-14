/** @type {import('jest-environment-puppeteer').JestPuppeteerConfig} */
module.exports = {
  server: {
    command: "npm run test-dev-server",
    port: 8081,
  },
};
