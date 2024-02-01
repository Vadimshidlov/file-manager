import * as os from "os";
import getCurrentDir from "../libs/fs/getCurrentDir.js";

export default class OSActions {
  constructor(process) {
    this.process = process;
  }

  action(parameter) {
    if (parameter === "--EOL") {
      this.getEol();
    }

    if (parameter === "--cpus") {
      this.getCpus();
    }

    if (parameter === "--homedir") {
      this.getHomedir();
    }

    if (parameter === "--username") {
      this.printUsername();
    }
    if (parameter === "--architecture") {
      this.printArchitecture();
    }
  }

  printArchitecture() {
    console.log(`\n${os.arch()}\n`);
    // getCurrentDir(this.process);
  }

  printUsername() {
    console.log(`\n${os.hostname()}\n`);
    // getCurrentDir(this.process);
  }

  getHomedir() {
    console.log(`\n${os.homedir()}\n`);
    // getCurrentDir(this.process);
  }

  getEol() {
    console.log(JSON.stringify(os.EOL));
    console.log(os.EOL);
    // getCurrentDir(this.process);
  }

  getCpus() {
    const cpusData = os.cpus().reduce((acc, el) => {
      acc.push({
        Model: el.model,
        "Clock Rate (GHz)": el.speed / 1000,
      });

      return acc;
    }, []);

    console.log(`\nThere are ${cpusData.length} CPUS\n`);

    console.table(cpusData);
    // getCurrentDir(this.process);
  }
}
