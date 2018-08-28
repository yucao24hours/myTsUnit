class WasRun {
  public wasRun: boolean;
  public constructor(name) {
    this.wasRun = false;
  }

  public testMethod(): void {
    this.wasRun = true;
  }
}

let test = new WasRun("testMethod");
console.log(test.wasRun);
test.testMethod();
console.log(test.wasRun);
