class WasRun {
  public wasRun: boolean;
  public method: () => void;
  public constructor(method: () => void) {
    this.method = method;
    this.wasRun = false;
  }

  public run(): void {
    this.method();
  }

  // public testMethod(): void {
  //   this.wasRun = true;
  // }
}

// これだと型はあってるからコンパイルは通るが、this.wasRun が更新されない。
let test = new WasRun(() => { this.wasRun = true; });
console.log(test.wasRun);
test.run();
console.log(test.wasRun);
