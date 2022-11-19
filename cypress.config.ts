const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    //Improvement: Local host could be separated as this was hardcoded based on running locally
    baseUrl: 'https://localhost:44397/api/', //The assessment has localhost at 3000
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
