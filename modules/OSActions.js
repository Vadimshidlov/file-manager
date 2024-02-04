import * as os from "os";

export default class OSActions {
  constructor(process) {
    this.process = process;
  }

  action(parameter) {
    if (parameter === "--EOL") {
      this.getEol();

      return;
    }

    if (parameter === "--cpus") {
      this.getCpus();

      return;
    }

    if (parameter === "--homedir") {
      this.getHomedir();

      return;
    }

    if (parameter === "--username") {
      this.printUsername();

      return;
    }
    if (parameter === "--architecture") {
      this.printArchitecture();

      return;
    }

    this.unknownCommand();
  }

  printArchitecture() {
    console.log(`\n${os.arch()}`);
  }

  printUsername() {
    console.log(`\n${os.hostname()}`);
  }

  getHomedir() {
    console.log(`\n${os.homedir()}`);
  }

  getEol() {
    console.log(JSON.stringify(os.EOL));
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
  }

  unknownCommand() {
    try {
      throw new Error("\nInvalid input\n");
    } catch (error) {
      console.log(error.message);
    }
  }
}
