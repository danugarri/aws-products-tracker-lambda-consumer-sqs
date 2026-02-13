import { pollQueue } from "./polling";
import "./i18n/i18n"; // Initialize i18n

// Start polling
(() => {
  try {
    pollQueue();
  } catch (error) {
    console.error("Fatal error in polling loop:", error);
    process.exit(1);
  }
})();
