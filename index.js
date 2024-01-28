import * as os from 'os';
import Actions from './actions.js';
import path from 'path';
import getUserName from './libs/start/getUserName.js';

const actions = new Actions(getUserName());

actions.start();

process.stdin.on('data', (chunk) => {
  const chunkToString = chunk.toString().trim();

  if (chunkToString === '.exit') {
    process.exit(0);
  }

  if (chunkToString === 'ls') {
    actions.ls(path.resolve(process.cwd()));
  }

  if (chunkToString.startsWith('cd')) {
    const toPath = chunkToString.split(' ')[1];

    actions.cd(toPath);
  }

  if (chunkToString.startsWith('cat')) {
    const toPath = chunkToString.split(' ')[1];

    actions.cat(toPath);
  }

  if (chunkToString.startsWith('add')) {
    const fileName = chunkToString.split(' ')[1];

    (async () => {
      await actions.add(fileName);
    })();
  }

  if (chunkToString === 'up') {
    const toPath = process.cwd();

    actions.up(toPath);
  }
});

process.on('beforeExit', () => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye! `);
});

process.on('SIGINT', () => {
  actions.end();
  process.exit(0);
});
