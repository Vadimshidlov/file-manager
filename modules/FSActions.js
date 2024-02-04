import * as fsPromises from "node:fs/promises";
import * as os from "os";
import * as fs from "node:fs";
import crypto from "crypto";
import { createReadStream, createWriteStream } from "fs";
import filesSortCallback from "../libs/fs/filesSortCallback.js";
import getFilesNames from "../libs/fs/getFilesNames.js";
import path from "path";
import { pipeline } from "node:stream/promises";

export default class FSActions {
  constructor(name) {
    this.userName = name;
  }

  sayWhereAmI() {
    console.log(`\nYou are currently in ${process.cwd()}\n`);
  }

  start() {
    const homeDir = os.homedir();
    process.chdir(homeDir);

    console.log(`Welcome to the File Manager, ${this.userName}!`);

    this.sayWhereAmI();
  }

  end() {
    console.log(`Thank you for using File Manager, ${this.userName}, goodbye!`);
  }

  async ls(currentPath) {
    try {
      try {
        const finalData = (await getFilesNames(currentPath)).sort(
          filesSortCallback,
        );

        console.table(finalData);
      } catch (error) {
        throw Error("Operation failed");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  cd(toPath) {
    try {
      try {
        process.chdir(toPath);
      } catch (error) {
        throw new Error("\nOperation failed");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  up(toPath) {
    try {
      let futurePath = path.join(process.cwd(), "../");

      if (futurePath === os.homedir()) {
        return;
      }

      process.chdir(futurePath);
    } catch (error) {
      console.log("Invalid input");
    }
  }

  async cat(filePath) {
    try {
      const readStream = createReadStream(filePath);

      readStream.on("error", (err) => {
        console.log("\nOperation failed");

        this.sayWhereAmI();
      });

      readStream.pipe(process.stdout).on("error", (err) => {
        console.log("Operation failed");
      });

      readStream.on("end", () => {
        this.sayWhereAmI();
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async add(fileName) {
    try {
      try {
        const newFilePath = path.join(process.cwd(), fileName);

        await fsPromises.writeFile(newFilePath, "", { flag: "wx+" });
      } catch (e) {
        throw new Error("Invalid input\n");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async rn(pathToFile, newName) {
    try {
      const currentPath = path.resolve(pathToFile);

      let futurePath = path.join(pathToFile, "../", newName);

      // check does the current file already exist?
      try {
        await fsPromises.access(pathToFile);
      } catch (error) {
        throw Error("Invalid input\n");
      }

      // check does the future file already exist?
      try {
        await fsPromises.access(futurePath);

        throw new Error("Invalid input\n");
      } catch (error) {
        if (error instanceof Error && error.message === "Invalid input\n") {
          throw error;
        }
      }

      // There is change name operation;
      try {
        const fileStat = await fsPromises.stat(currentPath);

        if (fileStat.isDirectory()) {
          throw new Error("Invalid input\n");
        }

        await fsPromises.rename(currentPath, futurePath);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async cp(pathToFile, newPathToFile) {
    try {
      const fileName = path.basename(pathToFile);

      const newFilePath = path.join(newPathToFile, fileName);

      try {
        await fsPromises.access(pathToFile);
      } catch (error) {
        throw Error("Operation failed\n");
      }

      // check does the future file already exist?
      const existFileErrorMessage =
        "\nOperation failed. This file already exist\n";

      try {
        await fsPromises.access(newFilePath);

        throw new Error(existFileErrorMessage);
      } catch (error) {
        if (error instanceof Error && error.message === existFileErrorMessage) {
          throw error;
        }
      }

      try {
        await fsPromises.writeFile(newFilePath, "", { flag: "wx+" });

        const readStream = createReadStream(pathToFile);
        const writableStream = createWriteStream(newFilePath);

        await pipeline(readStream, writableStream);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  async mv(pathToFile, newPathToFile) {
    try {
      const fileName = path.basename(pathToFile);

      const newFilePath = path.join(newPathToFile, fileName);

      try {
        await fsPromises.access(pathToFile);
      } catch (error) {
        throw Error("\nOperation failed");
      }

      // check does the future file already exist?
      try {
        await fsPromises.access(newFilePath);

        throw new Error("\nOperation failed");
      } catch (error) {
        if (error instanceof Error && error.message === "\nOperation failed") {
          throw error;
        }
      }

      try {
        await fsPromises.writeFile(newFilePath, "", { flag: "wx+" });

        const readStream = createReadStream(pathToFile);
        const writableStream = createWriteStream(newFilePath);

        await pipeline(readStream, writableStream);

        await fsPromises.rm(pathToFile);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  async rm(pathToFile) {
    try {
      try {
        await fsPromises.access(pathToFile);
      } catch (error) {
        throw Error("\nOperation failed");
      }

      try {
        await fsPromises.rm(pathToFile);
      } catch (error) {
        if (error instanceof Error) {
          throw Error("\nOperation failed");
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async calcHash(pathToFile) {
    try {
      const createHash = async () => {
        const hash = crypto.createHash("sha256");
        const content = fs.createReadStream(pathToFile);

        return new Promise((resolve, reject) => {
          content.on("readable", () => {
            const data = content.read();

            if (data) {
              hash.update(data);
            } else {
              resolve(hash.digest("hex"));
            }
          });

          content.on("error", reject);
        });
      };

      try {
        const hash = await createHash();
        console.log(`\n${hash}`);
      } catch (error) {
        throw new Error("\nOperation failed");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
}
