import * as os from 'os';

export default class OSActions {
  action(parametr) {
    if (parametr === '--EOL') {
      this.getEol();
    }
  }

  getEol() {
    console.log(JSON.stringify(os.EOL));
    console.log(os.EOL);
  }
}
