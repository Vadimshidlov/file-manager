import FSActions from "./modules/FSActions.js";
import getUserName from "./libs/start/getUserName.js";
import AppController from "./modules/AppController.js";

const appController = new AppController(process);

const actions = new FSActions(getUserName());

actions.start();

process.stdin.on("data", (chunk) => {
  const chunkToString = chunk.toString().trim();

  appController.action(chunkToString);
});

process.on("beforeExit", () => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye! `);
});

process.on("SIGINT", () => {
  actions.end();
  process.exit(0);
});
