class WasRun {
  public wasRun: boolean;
  public constructor(name) {
    this.wasRun = false;
  }

  public run(): void {
    this.testMethod();
  }

  public testMethod(): void {
    this.wasRun = true;
  }
}

let test = new WasRun("testMethod");
console.log(test.wasRun);
test.run();
console.log(test.wasRun);
