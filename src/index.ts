import { pollQueue } from "./polling";

// Start polling
(() => {
  try {
    pollQueue();
  } catch (error) {
    console.error("Fatal error in polling loop:", error);
    process.exit(1);
  }
})();
