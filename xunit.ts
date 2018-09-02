class TestCase {
  public method: () => void;
  public constructor() {}

  public run(): void {
    this.method();
  }

  public setMethod(method: () => void): void {
    this.method = method;
  }
}

class WasRun extends TestCase {
  public wasRun: boolean;
  public constructor() {
    super();
    this.wasRun = false;
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
