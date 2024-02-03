import FSActions from "./FSActions.js";
import pathResolver from "../libs/fs/pathResolver.js";
import OSActions from "./OSActions.js";
import path from "path";
import { GzipActions } from "./GzipActions.js";

export default class AppController {
  constructor(process, name) {
    this.process = process;
    this.osActions = new OSActions(process);
    this.fsActions = new FSActions(name);
    this.gzipActions = new GzipActions();
  }

  start() {
    this.fsActions.start();
  }

  end() {
    this.fsActions.end();
  }

  unknownCommand() {
    try {
      throw new Error("\nInvalid input\n");
    } catch (error) {
      console.log(error.message);
    }
  }

  async action(command) {
    if (command === ".exit") {
      this.fsActions.end();
      this.process.exit(0);
    }

    if (command === "ls") {
      await this.fsActions.ls(path.resolve(process.cwd()));

      this.fsActions.sayWhereAmI();

      return;
    }

    if (command === "up") {
      const toPath = this.process.cwd();

      this.fsActions.up(toPath);

      this.fsActions.sayWhereAmI();

      return;
    }

    if (command.startsWith("hash")) {
      const [pathToFile] = pathResolver(command);

      await this.fsActions.calcHash(pathToFile);
      this.fsActions.sayWhereAmI();

      return;
    }

    if (command.startsWith("cd")) {
      const [toPath] = pathResolver(command);

      this.fsActions.cd(toPath);
      this.fsActions.sayWhereAmI();

      return;
    }

    if (command.startsWith("cat")) {
      const [toPath] = pathResolver(command);

      this.fsActions.cat(toPath);

      return;
    }

    if (command.startsWith("add")) {
      const [fileName] = pathResolver(command);

      await (async () => {
        await this.fsActions.add(path.basename(fileName));
      })();

      this.fsActions.sayWhereAmI();

      return;
    }

    if (command.startsWith("rn")) {
      const [pathToFile, newFileName] = pathResolver(command);

      await (async () => {
        await this.fsActions.rn(pathToFile, path.basename(newFileName));
      })();

      this.fsActions.sayWhereAmI();

      return;
    }

    if (command.startsWith("cp")) {
      const [pathToFile, newPathToFile] = pathResolver(command);

      await (async () => {
        await this.fsActions.cp(pathToFile, newPathToFile);
      })();

      this.fsActions.sayWhereAmI();

      return;
    }

    if (command.startsWith("mv")) {
      const [pathToFile, newPathToFile] = pathResolver(command);

      await (async () => {
        await this.fsActions.mv(pathToFile, newPathToFile);
      })();

      this.fsActions.sayWhereAmI();

      return;
    }

    if (command.startsWith("rm")) {
      const [pathToFile] = pathResolver(command);

      await (async () => {
        await this.fsActions.rm(pathToFile);
      })();

      this.fsActions.sayWhereAmI();
      return;
    }

    if (command.startsWith("compress")) {
      const [pathToFile, pathToCompressFIle] = pathResolver(command);

      console.log(pathToFile, pathToCompressFIle);

      await (async () => {
        await this.gzipActions.compress(pathToFile, pathToCompressFIle);
      })();

      this.fsActions.sayWhereAmI();

      return;
    }

    if (command.startsWith("decompress")) {
      const [pathToFile, pathToCompressFIle] = pathResolver(command);

      await (async () => {
        await this.gzipActions.decompress(pathToFile, pathToCompressFIle);
      })();

      this.fsActions.sayWhereAmI();

      return;
    }

    if (command.startsWith("os")) {
      const osArgument = command.split(" ")[1];

      this.osActions.action(osArgument);

      this.fsActions.sayWhereAmI();

      return;
    }

    this.unknownCommand();
  }
}
