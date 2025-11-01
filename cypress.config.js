const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    pageLoadTimeout: 120000, // nunggu hingga 120 detik
    defaultCommandTimeout: 10000, // tiap perintah dikasih waktu lebih lama
  },
});
