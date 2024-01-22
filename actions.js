import * as fsPromises from "node:fs/promises";
import * as os from "os";
import filesSortCallback from "./libs/fs/filesSortCallback.js";
import getFilesNames from "./libs/fs/getFilesNames.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default class Actions {
  async ls(currentPath) {
    try {
      const finalData = (await getFilesNames(currentPath)).sort(
        filesSortCallback,
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

    /*console.log(toPath, "toPath");

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

    process.chdir(futurePath);*/
  }
}
