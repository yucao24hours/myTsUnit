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

class TestCaseTest extends TestCase {
  public testRunning(): void {
    let test = new WasRun();
    test.method = test.testMethod;
    assert(!test.wasRun);
    test.run();
    assert(test.wasRun);
  }

  public testSetUp(): void {
    let test = new WasRun();
    test.run();
    assert(test.wasSetUp);
  }
}

function assert(result: boolean): void {
  if (!result) {
    throw "Test failed.";
  }
}

let testCaseTest = new TestCaseTest();
testCaseTest.method = testCaseTest.testRunning;
testCaseTest.run();

testCaseTest.method = testCaseTest.testSetUp;
testCaseTest.run();
