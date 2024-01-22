import * as fsPromises from 'node:fs/promises';
import path from 'path';
import filesSortCallback from './libs/fs/filesSortCallback.js';
import getFilesNames from './libs/fs/getFilesNames.js';

export default class Actions {
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
      process.chdir(toPath);
      console.log(`You are currently in ${process.cwd()}\n`);
    } catch (error) {
      console.log('Invalid input');
    }
  }
}
