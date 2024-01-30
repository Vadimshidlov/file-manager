import * as os from 'os';
import Actions from './FSActions.js';
import path from 'path';
import getUserName from './libs/start/getUserName.js';
import OpetationSystem from './os.js';
import AppController from './modules/AppController.js';

const appController = new AppController(process);

const actions = new Actions(getUserName());
const osActions = new OpetationSystem();

actions.start();

process.stdin.on('data', (chunk) => {
  const chunkToString = chunk.toString().trim();

  appController.action(chunkToString);
});

process.on('beforeExit', () => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye! `);
});

process.on('SIGINT', () => {
  actions.end();
  process.exit(0);
});
