import FSActions from "./FSActions.js";
import pathResolver from "../libs/fs/pathResolver.js";
import OSActions from "./OSActions.js";
import path from "path";
import { GzipActions } from "./GzipActions.js";

export default class AppController {
  constructor(process) {
    this.process = process;
    this.osActions = new OSActions(process);
    this.fsActions = new FSActions();
    this.gzipActions = new GzipActions();
  }

  action(command) {
    if (command === ".exit") {
      this.fsActions.end();
      this.process.exit(0);
    }

    if (command === "ls") {
      this.fsActions.ls(path.resolve(process.cwd()));
    }

    if (command === "up") {
      const toPath = this.process.cwd();

      this.fsActions.up(toPath);
    }

    if (command.startsWith("hash")) {
      // const pathToFile = command.split(" ")[1];

      const [pathToFile] = pathResolver(command);

      this.fsActions.calcHash(pathToFile);
    }

    if (command.startsWith("cd")) {
      // const toPath = command.split(' ')[1];
      const [toPath] = pathResolver(command);

      console.log(toPath, `toPath from cd`);

      this.fsActions.cd(toPath);
    }

    if (command.startsWith("cat")) {
      // const toPath = command.split(" ")[1];

      const [toPath] = pathResolver(command);

      this.fsActions.cat(toPath);
    }

    if (command.startsWith("add")) {
      // const fileName = command.split(" ")[1];

      const [fileName] = pathResolver(command);

      (async () => {
        await this.fsActions.add(path.basename(fileName));
      })();
    }

    if (command.startsWith("rn")) {
      // const pathToFile = command.split(" ")[1];
      // const newFileName = command.split(" ")[2];

      const [pathToFile, newFileName] = pathResolver(command);

      // console.log(path.basename(newFileName), `newFileName from rn`);

      (async () => {
        await this.fsActions.rn(pathToFile, path.basename(newFileName));
      })();
    }

    if (command.startsWith("cp")) {
      /* const pathToFile = command.split(" ")[1];
      const newPathToFile = command.split(" ")[2]; */

      const [pathToFile, newPathToFile] = pathResolver(command);

      (async () => {
        await this.fsActions.cp(pathToFile, newPathToFile);
      })();
    }

    if (command.startsWith("mv")) {
      /* const pathToFile = command.split(" ")[1];
      const newPathToFile = command.split(" ")[2]; */

      const [pathToFile, newPathToFile] = pathResolver(command);

      (async () => {
        await this.fsActions.mv(pathToFile, newPathToFile);
      })();
    }

    if (command.startsWith("rm")) {
      // const pathToFile = command.split(" ")[1];

      const [pathToFile] = pathResolver(command);

      (async () => {
        await this.fsActions.rm(pathToFile);
      })();
    }

    if (command.startsWith("compress")) {
      // const pathToFile = command.split(" ")[1];

      const [pathToFile, pathToCompressFIle] = pathResolver(command);

      console.log(pathToFile, pathToCompressFIle);

      (async () => {
        await this.gzipActions.compress(pathToFile, pathToCompressFIle);
      })();
    }

    if (command.startsWith("decompress")) {
      // const pathToFile = command.split(" ")[1];

      const [pathToFile, pathToCompressFIle] = pathResolver(command);

      (async () => {
        await this.gzipActions.decompress(pathToFile, pathToCompressFIle);
      })();
    }

    if (command.startsWith("os")) {
      const osArgument = command.split(" ")[1];

      this.osActions.action(osArgument);
    }
  }
}
