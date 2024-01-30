import FSActions from '../FSActions.js';
import OSActions from '../os.js';
import path from 'path';

export default class AppController {
  constructor(process) {
    this.process = process;
    this.osActions = new OSActions(process);
    this.fsActions = new FSActions();
  }

  action(command) {
    if (command === '.exit') {
      this.process.exit(0);
    }

    if (command === 'ls') {
      this.fsActions.ls(path.resolve(process.cwd()));
    }

    if (command === 'up') {
      const toPath = this.process.cwd();

      this.fsActions.up(toPath);
    }

    if (command.startsWith('hash')) {
      const pathToFile = command.split(' ')[1];

      this.fsActions.calcHash(pathToFile);
    }

    if (command.startsWith('cd')) {
      const toPath = command.split(' ')[1];

      this.fsActions.cd(toPath);
    }

    if (command.startsWith('cat')) {
      const toPath = command.split(' ')[1];

      this.fsActions.cat(toPath);
    }

    if (command.startsWith('add')) {
      const fileName = command.split(' ')[1];

      (async () => {
        await this.fsActions.add(fileName);
      })();
    }

    if (command.startsWith('rn')) {
      const pathToFile = command.split(' ')[1];
      const newFileName = command.split(' ')[2];

      (async () => {
        await this.fsActions.rn(pathToFile, newFileName);
      })();
    }

    if (command.startsWith('cp')) {
      const pathToFile = command.split(' ')[1];
      const newPathToFile = command.split(' ')[2];

      (async () => {
        await this.fsActions.cp(pathToFile, newPathToFile);
      })();
    }

    if (command.startsWith('mv')) {
      const pathToFile = command.split(' ')[1];
      const newPathToFile = command.split(' ')[2];

      (async () => {
        await this.fsActions.mv(pathToFile, newPathToFile);
      })();
    }

    if (command.startsWith('rm')) {
      const pathToFile = command.split(' ')[1];

      (async () => {
        await this.fsActions.rm(pathToFile);
      })();
    }

    if (command.startsWith('os')) {
      const osArgument = command.split(' ')[1];

      this.osActions.action(osArgument);
    }
  }
}
