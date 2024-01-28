import * as fsPromises from 'node:fs/promises';
import * as os from 'os';
import { createReadStream } from 'fs';
import filesSortCallback from './libs/fs/filesSortCallback.js';
import getFilesNames from './libs/fs/getFilesNames.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default class Actions {
  constructor(name) {
    console.log(name, `name from constructor`);
    this.userName = name;
  }

  start() {
    const homeDir = os.homedir();

    process.chdir(homeDir);

    console.log(`Welcome to the File Manager, ${this.userName}!\n`);

    console.log(`You are currently in ${process.cwd()}\n`);
  }

  end() {
    console.log(`Thank you for using File Manager, ${this.userName}, goodbye! `);
  }

  async ls(currentPath) {
    try {
      const finalData = (await getFilesNames(currentPath)).sort(filesSortCallback);

      console.table(finalData);
      console.log(`You are currently in ${process.cwd()}\n`);
    } catch (error) {
      throw Error('FS operation failed');
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
      console.log('Invalid input');
    }
  }

  up(toPath) {
    try {
      let futurePath = path.join(process.cwd(), '../');

      if (futurePath === os.homedir()) {
        return;
      }

      process.chdir(futurePath);
      console.log(`You are currently in ${process.cwd()}\n`);
    } catch (error) {
      console.log('Invalid input');
    }
  }

  cat(filePath) {
    try {
      console.log(filePath, `filePath from cat`);

      const readStream = createReadStream(filePath);

      readStream.on('error', (err) => {
        console.log('Invalid input\n');
      });

      readStream.pipe(process.stdout).on('error', (err) => {
        console.log('Invalid input from pipe\n');
      });

      readStream.on('end', () => {
        console.log(`\nYou are currently in ${process.cwd()}\n`);
      });
    } catch (error) {
      console.log('Invalid input\n');
    }
  }

  async add(fileName) {
    try {
      try {
        const go = process.cwd();

        const newFilePath = path.join(process.cwd(), fileName);

        await fsPromises.writeFile(newFilePath, '', { flag: 'wx+' });

        console.log(`\nYou are currently in ${process.cwd()}\n`);
      } catch (e) {
        throw new Error('Invalid input\n');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
}
