import { createGzip, createUnzip } from "zlib";
import { createReadStream, createWriteStream } from "node:fs";
import { rm } from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import path from "path";
import { fileURLToPath } from "url";

export class GzipActions {
  async compress(pathToFile, pathToCompressFile) {
    try {
      const readStream = createReadStream(pathToFile);
      const writeStream = createWriteStream(pathToCompressFile);
      const gzip = createGzip();

      try {
        await pipeline(readStream, gzip, writeStream);
        await rm(pathToFile);
      } catch (error) {
        //   console.log(error);
        throw new Error("Invalid input\n");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async decompress(pathToCompressFile, futurePathToFile) {
    try {
      const readStream = createReadStream(pathToCompressFile);
      const writeStream = createWriteStream(futurePathToFile);
      const gzip = createUnzip();

      try {
        await pipeline(readStream, gzip, writeStream);
        await rm(pathToFile);
      } catch (error) {
        //   console.log(error);
        throw new Error("Invalid input\n");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
}
