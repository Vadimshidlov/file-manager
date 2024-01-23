import * as fsPromises from "node:fs/promises";
import * as os from "os";
import { createReadStream } from "fs";
import filesSortCallback from "./libs/fs/filesSortCallback.js";
import getFilesNames from "./libs/fs/getFilesNames.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default class Actions {
  constructor(name) {
    console.log(name, `name from constructor`);
    this.userName = name;
  }

  /*  getUserName() {
    const startArgument = process.argv.slice(2);
    const startNameIndex = startArgument[0].indexOf("=");

    const userName = startArgument[0].slice(
      startNameIndex !== -1 ? startNameIndex + 1 : 0
    );

    return userName;
  } */

  start() {
    /* const startArgument = process.argv.slice(2);
    const startNameIndex = startArgument[0].indexOf("=");

    const userName = startArgument[0].slice(
      startNameIndex !== -1 ? startNameIndex + 1 : 0
    ); */

    const homeDir = os.homedir();

    process.chdir(homeDir);

    console.log(`Welcome to the File Manager, ${this.userName}!\n`);

    console.log(`You are currently in ${process.cwd()}\n`);
  }

  end() {
    console.log(
      `Thank you for using File Manager, ${this.userName}, goodbye! `
    );
  }

  async ls(currentPath) {
    try {
      const finalData = (await getFilesNames(currentPath)).sort(
        filesSortCallback
      );

      console.table(finalData);
      console.log(`You are currently in ${process.cwd()}\n`);
    } catch (error) {
      throw Error("FS operation failed");
    }
  }

  cd(toPath) {
    try {
      if (toPath.startsWith("'")) {
        toPath = toPath.slice(1, toPath.length - 1);
      }

      process.chdir(toPath);
      console.log(`You are currently in ${process.cwd()}\n`);
    } catch (error) {
      console.log("Invalid input");
    }
  }

  up(toPath) {
    try {
      let futurePath = path.join(process.cwd(), "../");

      if (futurePath === os.homedir()) {
        return;
      }

      process.chdir(futurePath);
      console.log(`You are currently in ${process.cwd()}\n`);
    } catch (error) {
      console.log("Invalid input");
    }
  }

  cat(filePath) {
    try {
      console.log(filePath, `filePath from cat`);

      const readStream = createReadStream(filePath);

      readStream.on("error", (err) => {
        console.log("Invalid input\n");
      });

      readStream.pipe(process.stdout).on("error", (err) => {
        console.log("Invalid input from pipe\n");
      });
    } catch (error) {
      console.log("Invalid input\n");
    }
  }

  add(fileName) {}
}

/*
    // for up function
    console.log(toPath, "toPath");

    let futurePath;

    if (os.platform() === "win32") {
      const currentArr = toPath.split("/");

      futurePath = currentArr.slice(0, currentArr.length - 2).join("/");

      console.log(futurePath, "futurePath");
    }

    if (futurePath === os.homedir()) {
      return;
    }

    console.log(futurePath);

    console.log(2);

    process.chdir(futurePath);
    */
