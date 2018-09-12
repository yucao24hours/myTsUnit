class TestCase {
  private _method: () => void;
  public constructor() {}

  public run(): void {
    this._method();
  }

  set method(method: () => void) {
    this._method = method;
  }
}

class WasRun extends TestCase {
  public wasRun: boolean;
  public constructor() {
    super();
    this.wasRun = false;
  }

  public testMethod(): void {
    console.log("testMethod called!");
    this.wasRun = true;
  }
}

let test = new WasRun();
// 実行するメソッドを（外から）指定する感じ
test.method = test.testMethod;
console.log(test.wasRun);
test.run();
console.log(test.wasRun);
