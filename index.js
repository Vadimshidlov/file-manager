import * as os from "os";
import Actions from "./actions.js";
import path from "path";
import getUserName from "./libs/start/getUserName.js";

const actions = new Actions(getUserName());

/* const startArgument = process.argv.slice(2);
const startNameIndex = startArgument[0].indexOf("=");

const userName = startArgument[0].slice(
  startNameIndex !== -1 ? startNameIndex + 1 : 0
);

const homeDir = os.homedir();

process.chdir(homeDir);

console.log(`Welcome to the File Manager, ${userName}!\n`);

console.log(`You are currently in ${process.cwd()}\n`); */

actions.start();

process.stdin.on("data", (chunk) => {
  const chunkToString = chunk.toString().trim();

  if (chunkToString === ".exit") {
    process.exit(0);
  }

  if (chunkToString === "ls") {
    actions.ls(path.resolve(process.cwd()));
  }

  if (chunkToString.startsWith("cd")) {
    const toPath = chunkToString.split(" ")[1];

    actions.cd(toPath);
  }

  if (chunkToString.startsWith("cat")) {
    const toPath = chunkToString.split(" ")[1];

    actions.cat(toPath);
  }

  if (chunkToString === "up") {
    const toPath = process.cwd();

    actions.up(toPath);
  }
});

process.on("beforeExit", () => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye! `);
});

process.on("SIGINT", () => {
  // console.log(`Thank you for using File Manager, ${userName}, goodbye! `);
  actions.end();
  process.exit(0);
});
