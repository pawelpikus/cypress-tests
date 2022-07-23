import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://www.expedia.com/Flights",
    chromeWebSecurity: false,
  },
});
