import { createGzip, createUnzip } from "zlib";
import { createReadStream, createWriteStream } from "node:fs";
import { rm } from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import path from "path";

export class GzipActions {
  async compress(pathToFile, pathToCompressFile) {
    try {
      console.log("compress 1");

      const futureFileName = `${path.basename(pathToFile)}.gz`;

      const readStream = createReadStream(pathToFile);
      const writeStream = createWriteStream(
        path.join(pathToCompressFile, futureFileName),
      );
      const gzip = createGzip();

      console.log("compress 2");

      try {
        await pipeline(readStream, gzip, writeStream);
        console.log("compress 3");

        await rm(pathToFile);
        console.log("compress 4");
      } catch (error) {
        console.log(error);
        // throw new Error("Invalid input\n");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async decompress(pathToCompressFile, futurePathToFile) {
    console.log(pathToCompressFile, futurePathToFile);

    try {
      const fileBaseName = path.basename(pathToCompressFile);

      const futureFileName = fileBaseName.slice(
        0,
        fileBaseName.lastIndexOf("."),
      );

      console.log(futureFileName, `futureFileName`);

      const readStream = createReadStream(pathToCompressFile);

      console.log("1");
      const writeStream = createWriteStream(
        path.join(futurePathToFile, futureFileName),
      );
      console.log("2");

      const unzip = createUnzip();
      console.log("3");

      try {
        console.log("4");

        await pipeline(readStream, unzip, writeStream);
        console.log("5");

        await rm(pathToCompressFile);
      } catch (error) {
        console.log(error);
        // throw new Error("Invalid input\n");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
}
