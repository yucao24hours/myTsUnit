class TestCase {
  private _method: () => void;
  public constructor() {}

  public setUp(): void {
    // 何もしない
    // 理由: インタフェースの提供と、デフォルトの実装の提供のため
  }

  public run(): void {
    this.setUp();
    this._method();
  }

  set method(method: () => void) {
    this._method = method;
  }
}

class WasRun extends TestCase {
  public wasRun: boolean;
  public log: string;
  public constructor() {
    super();
    this.wasRun = false;
    this.log = "setUp ";
  }

  public setUp(): void {
    console.log("setUp called!");
    this.log = "setUp "
  }

  public testMethod(): void {
    console.log("testMethod called!");
    this.wasRun = true;
    this.log = this.log + "testMethod "
  }
}

class TestCaseTest extends TestCase {
  public test: WasRun;
  public constructor() {
    super();
    this.test = new WasRun();
  }

  public setUp(): void {
    this.test.method = this.test.testMethod;
  }

  public testRunning(): void {
    this.test.run();
    assert(this.test.wasRun);
  }

  // setUp が実行されたことを確認するテストケース
  public testSetUp(): void {
    this.test.run();
    assert("setUp testMethod " == this.test.log);
  }
}

function assert(result: boolean): void {
  if (!result) {
    throw "Test failed.";
  }
}

let testCaseTest1 = new TestCaseTest();
testCaseTest1.method = testCaseTest1.testRunning;
testCaseTest1.run();

let testCaseTest2 = new TestCaseTest();
testCaseTest2.method = testCaseTest2.testSetUp;
testCaseTest2.run();
