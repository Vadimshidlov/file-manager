import getUserName from "./libs/start/getUserName.js";
import AppController from "./modules/AppController.js";

const appController = new AppController(process, getUserName() || "Anonymous");

appController.start();

process.stdin.on("data", (chunk) => {
  const chunkToString = chunk.toString().trim();

  appController.action(chunkToString);
});

process.on("beforeExit", () => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye! `);
});

process.on("SIGINT", () => {
  appController.end();
  process.exit(0);
});
