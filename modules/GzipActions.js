import {
  createGzip,
  createUnzip,
  createBrotliCompress,
  createBrotliDecompress,
} from "zlib";
import { createReadStream, createWriteStream } from "node:fs";
import { rm } from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import path from "path";

export class GzipActions {
  async compress(pathToFile, pathToCompressFile) {
    try {
      const futureFileName = `${path.basename(pathToFile)}.br`;

      const readStream = createReadStream(pathToFile);
      const writeStream = createWriteStream(
        path.join(pathToCompressFile, futureFileName),
      );

      const brotliCompress = createBrotliCompress();

      try {
        await pipeline(readStream, brotliCompress, writeStream);

        console.log("Success Brotli-compress");

        // await rm(pathToFile);

        // console.log("Success Brotli-compress");
      } catch (error) {
        console.log("Brotli compress error");

        throw new Error("Operation failed");
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

      console.log(futureFileName, `futureFileName`);

      const readStream = createReadStream(pathToCompressFile);

      const writeStream = createWriteStream(
        path.join(futurePathToFile, futureFileName),
      );

      const decompressBrotli = createBrotliDecompress();

      try {
        await pipeline(readStream, decompressBrotli, writeStream);

        console.log("Success decompress");

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
