const { defineConfig } = require("cypress");

module.exports = defineConfig({
  
  e2e: {
    baseUrl : 'https://www.google.com',
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 5000,
    video: false,
    screenshotOnRunFailure: true,
    pageLoadTimeout: 10000,

    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
  },
});
