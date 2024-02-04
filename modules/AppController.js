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
      throw new Error("\nInvalid input");
    } catch (error) {
      console.log(error.message);

      this.fsActions.sayWhereAmI();
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
      const params = pathResolver(command);

      if (!Array.isArray(params)) {
        this.fsActions.sayWhereAmI();

        return;
      }

      const [pathToFile] = params;

      await this.fsActions.calcHash(pathToFile);
      this.fsActions.sayWhereAmI();

      return;
    }

    if (command.startsWith("cd")) {
      const params = pathResolver(command);

      if (!Array.isArray(params)) {
        this.fsActions.sayWhereAmI();

        return;
      }

      const [toPath] = params;

      this.fsActions.cd(toPath);

      this.fsActions.sayWhereAmI();

      return;
    }

    if (command.startsWith("cat")) {
      const params = pathResolver(command);

      if (!Array.isArray(params)) {
        this.fsActions.sayWhereAmI();

        return;
      }

      const [toPath] = params;

      await this.fsActions.cat(toPath);

      // this.fsActions.sayWhereAmI();

      return;
    }

    if (command.startsWith("add")) {
      const params = pathResolver(command);

      if (!Array.isArray(params)) {
        this.fsActions.sayWhereAmI();

        return;
      }

      const [fileName] = params;

      await (async () => {
        await this.fsActions.add(path.basename(fileName));
      })();

      this.fsActions.sayWhereAmI();

      return;
    }

    if (command.startsWith("rn")) {
      const params = pathResolver(command);

      if (!Array.isArray(params)) {
        this.fsActions.sayWhereAmI();

        return;
      }

      if (params.length !== 2) {
        console.log("\nInvalid input");
        this.fsActions.sayWhereAmI();

        return;
      }

      const [pathToFile, newFileName] = params;

      await (async () => {
        await this.fsActions.rn(pathToFile, path.basename(newFileName));
      })();

      this.fsActions.sayWhereAmI();

      return;
    }

    if (command.startsWith("cp")) {
      const params = pathResolver(command);

      if (!Array.isArray(params)) {
        this.fsActions.sayWhereAmI();

        return;
      }

      if (params.length !== 2) {
        console.log("\nInvalid input");
        this.fsActions.sayWhereAmI();

        return;
      }

      const [pathToFile, newPathToFile] = params;
      // const [pathToFile, newPathToFile] = pathResolver(command);

      await (async () => {
        await this.fsActions.cp(pathToFile, newPathToFile);
      })();

      this.fsActions.sayWhereAmI();

      return;
    }

    if (command.startsWith("mv")) {
      const params = pathResolver(command);

      if (!Array.isArray(params)) {
        this.fsActions.sayWhereAmI();

        return;
      }

      if (params.length !== 2) {
        console.log("\nInvalid input");
        this.fsActions.sayWhereAmI();

        return;
      }

      const [pathToFile, newPathToFile] = params;
      // const [pathToFile, newPathToFile] = pathResolver(command);

      await (async () => {
        await this.fsActions.mv(pathToFile, newPathToFile);
      })();

      this.fsActions.sayWhereAmI();

      return;
    }

    if (command.startsWith("rm")) {
      //!
      const params = pathResolver(command);

      if (!Array.isArray(params)) {
        this.fsActions.sayWhereAmI();

        return;
      }

      const [pathToFile] = params;
      // const [pathToFile] = pathResolver(command);

      await (async () => {
        await this.fsActions.rm(pathToFile);
      })();

      this.fsActions.sayWhereAmI();
      return;
    }

    if (command.startsWith("compress")) {
      const params = pathResolver(command);

      if (!Array.isArray(params)) {
        this.fsActions.sayWhereAmI();

        return;
      }

      if (params.length !== 2) {
        console.log("\nInvalid input");
        this.fsActions.sayWhereAmI();

        return;
      }

      const [pathToFile, pathToCompressFIle] = params;
      // const [pathToFile, pathToCompressFIle] = pathResolver(command);

      await (async () => {
        await this.gzipActions.compress(pathToFile, pathToCompressFIle);
      })();

      this.fsActions.sayWhereAmI();

      return;
    }

    if (command.startsWith("decompress")) {
      const params = pathResolver(command);

      if (!Array.isArray(params)) {
        this.fsActions.sayWhereAmI();

        return;
      }

      if (params.length !== 2) {
        console.log("\nInvalid input");
        this.fsActions.sayWhereAmI();

        return;
      }

      const [pathToFile, pathToCompressFIle] = params;
      // const [pathToFile, pathToCompressFIle] = pathResolver(command);

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
