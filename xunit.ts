class WasRun {
  public wasRun: boolean;
  public method: () => void;
  public constructor() {
    this.wasRun = false;
  }

  public setMethod(method: () => void): void {
    this.method = method;
  }

  public run(): void {
    this.method();
  }

  public testMethod(): void {
    console.log("testMethod called.");
    this.wasRun = true;
  }
}

let test = new WasRun();
// 実行するメソッドを（外から）指定する感じ
test.setMethod(test.testMethod);
console.log(test.wasRun);
test.run();
console.log(test.wasRun);
