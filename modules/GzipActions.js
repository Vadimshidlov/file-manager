import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { createReadStream, createWriteStream } from "node:fs";
import { rm } from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import path from "path";
import * as fsPromises from "node:fs/promises";

export class GzipActions {
  constructor() {
    this.errorMessage = "\nOperation failed";
  }

  async compress(pathToFile, pathToCompressFile) {
    try {
      const futureFileName = `${path.basename(pathToFile)}.br`;
      const futureFilePath = path.join(pathToCompressFile, futureFileName);

      // check is destination file already exist before decompressing
      try {
        await fsPromises.access(futureFilePath);

        throw new Error(this.errorMessage);
      } catch (error) {
        if (error.message === this.errorMessage) {
          console.log(error.message);

          return;
        }
      }

      try {
        const readStream = createReadStream(pathToFile);
        const writeStream = createWriteStream(futureFilePath);

        const brotliCompress = createBrotliCompress();

        await pipeline(readStream, brotliCompress, writeStream);

        await rm(pathToFile);
      } catch (error) {
        throw new Error(this.errorMessage);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async decompress(pathToCompressFile, futurePathToFile) {
    try {
      const fileBaseName = path.basename(pathToCompressFile);

      const futureFileName = fileBaseName.slice(
        0,
        fileBaseName.lastIndexOf("."),
      );

      const futureFilePath = path.join(futurePathToFile, futureFileName);

      // check is destination file already exist before decompressing
      try {
        await fsPromises.access(futureFilePath);

        throw new Error(this.errorMessage);
      } catch (error) {
        if (error.message === this.errorMessage) {
          console.log(error.message);

          return;
        }
      }

      try {
        const readStream = createReadStream(pathToCompressFile);

        const writeStream = createWriteStream(futureFilePath);

        const decompressBrotli = createBrotliDecompress();

        await pipeline(readStream, decompressBrotli, writeStream);

        await rm(pathToCompressFile);
      } catch (error) {
        throw new Error(this.errorMessage);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
}
