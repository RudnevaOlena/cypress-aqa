const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    reportFilename: '[status]_[datetime]-report',
    timestamp: 'longDate',
    html: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    charts: true,
    showPassed: true,
    showFailed: true,
    showPending: true,
    ignoreVideos: true,
    saveAllAttempts: false,
  },

  e2e: {
    baseUrl: 'https://qauto.forstudy.space/',
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 5000,
    video: false,
    screenshotOnRunFailure: true,
    pageLoadTimeout: 10000,

    setupNodeEvents(on, config) {
      const envName = config.env.environment || 'prod';

      if (envName === 'prod') {
        config.baseUrl = 'https://qauto.forstudy.space/';
      } else if (envName === 'devenv') {
        config.baseUrl = 'https://qauto2.forstudy.space/';
      } else {
        throw new Error(`Environment "${envName}" not found`);
      }

      const envConfig = config.env[envName];
      if (envConfig) {
        config.env.email = envConfig.email;
        config.env.password = envConfig.password;
      }

      config.env.environmentName = envName;
      config.reporterOptions.reportTitle = `${envName.toUpperCase()} - ${config.baseUrl}`;

      require('cypress-mochawesome-reporter/plugin')(on, config);

      console.log(`Environment: ${envName.toUpperCase()}`);
      console.log(`Base URL: ${config.baseUrl}`);
      console.log(`Email: ${config.env.email}`);
      return config;
    }
  }
})