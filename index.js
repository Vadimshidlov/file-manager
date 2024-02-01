import FSActions from "./modules/FSActions.js";
import getUserName from "./libs/start/getUserName.js";
import AppController from "./modules/AppController.js";

// const appController = new AppController(process);
const appController = new AppController(process, getUserName());

// const actions = new FSActions(getUserName());
// const actions = new FSActions(getUserName());

appController.start();

process.stdin.on("data", (chunk) => {
  const chunkToString = chunk.toString().trim();

  appController.action(chunkToString);
});

process.on("beforeExit", () => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye! `);
});

process.on("SIGINT", () => {
  // actions.end();

  appController.end();
  process.exit(0);
});
