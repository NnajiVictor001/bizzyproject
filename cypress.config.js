/* eslint-disable import/no-extraneous-dependencies */
const { defineConfig } = require('cypress');
const TempMail = require('node-temp-mail');

let temp;

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, _config) {
      // implement node event listeners here
      on('task', {
        async initEmail(fakeMail) {
          temp = new TempMail(fakeMail);
          return null;
        },
        async createEmail() {
          return temp.getAddress().address;
        },
        async getEmails() {
          return new Promise((resolve, reject) => {
            temp.fetchEmails((err, data) => {
              if (err) reject(err);
              else resolve(data);
            });
          });
        }
      });
    }
  }
});
