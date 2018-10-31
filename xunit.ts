class TestCase {
  private _method: () => void;
  public constructor() {}

  public setUp(): void {
    // 何もしない
    // 理由: インタフェースの提供と、デフォルトの実装の提供のため
  }

  public tearDown(): void {
    // 何もしない
    // 理由: インタフェースの提供と、デフォルトの実装の提供のため
  }

  public run(result: TestResult): void {
    result.testStarted();
    this.setUp();
    try {
      this._method();
    }
    catch(e) {
      result.testFailed();
    }
    this.tearDown();
  }

  set method(method: () => void) {
    this._method = method;
  }
}

class WasRun extends TestCase {
  public log: string;
  public constructor() {
    super();
    this.log = "setUp ";
  }

  public setUp(): void {
    this.log = "setUp "
  }

  public testMethod(): void {
    this.log = this.log + "testMethod "
  }

  public tearDown(): void {
    this.log = this.log + "tearDown "
  }

  public testBrokenMethod(): void {
    throw "Test was broken intentionally.";
  }
}

class TestSuite {
  private tests: WasRun[];

  public add(wasRun: WasRun): void {
    this.tests.push(wasRun);
  }

  public run(result: TestResult): void {
    for(let test of this.tests) {
      test.run(result);
    }
  }
}

class TestCaseTest extends TestCase {
  public constructor() {
    super();
  }

  // NOTE: 一連のテストがまとめて実行できていることを確認するテストケース
  public testSuite(): void {
    let suite = new TestSuite();

    let test1 = new WasRun();
    test1.method = test1.testMethod;
    suite.add(test1);

    let test2 = new WasRun();
    test2.method = test2.testBrokenMethod;
    suite.add(test2);

    let result = new TestResult();
    suite.run(result);

    assert("2 runl 1 failed" == result.summary());
  }

  // NOTE: テンプレートメソッドパターンに則って、テストが期待した順序で呼ばれていることを
  //       確認するテストケース
  public testTemplateMethod(): void {
    let test = new WasRun();
    test.method = test.testMethod;

    test.run();

    assert("setUp testMethod tearDown " == test.log);
  }

  // NOTE: テストが成功したときの結果文言を確認するテストケース
  public testResult(): void {
    let test = new WasRun();
    test.method = test.testMethod;

    let result = test.run();

    assert("1 run, 0 failed" == result.summary());
  }

  // NOTE: テストが失敗したときの結果文言を確認するテストケース
  public testFailedResult(): void {
    let test = new WasRun();
    test.method = test.testMethod;

    let result = test.run();
    assert("1 run, 1 failed" == result.summary());
  }

  // NOTE: testFailed が呼ばれたときに期待通りに failed の数が出力されるのを
  //       確認するテストケース
  public testFailedResultFormatting(): void {
    let result = new TestResult();
    result.testStarted();
    result.testFailed();

    assert("1 run, 1 failed" == result.summary());
  }
}

class TestResult {
  private runCount: number;
  private errorCount: number;
  constructor() {
    this.runCount = 0;
    this.errorCount = 0;
  }

  public testStarted(): void {
    this.runCount = this.runCount + 1;
  }

  public testFailed(): void {
    this.errorCount = this.errorCount + 1;
  }

  public summary(): string {
    return `${this.runCount} run, ${this.errorCount} failed`;
  }
}

function assert(result: boolean): void {
  if (!result) {
    throw "Test failed.";
  }
}

// let testCaseTest1 = new TestCaseTest();
// testCaseTest1.method = testCaseTest1.testTemplateMethod;
// console.log(testCaseTest1.run().summary());

let testCaseTest2 = new TestCaseTest();
testCaseTest2.method = testCaseTest2.testResult;
console.log(testCaseTest2.run().summary());

let testCaseTest3 = new TestCaseTest();
testCaseTest3.method = testCaseTest3.testFailedResult;
console.log(testCaseTest3.run().summary());

let testCaseTest4 = new TestCaseTest();
testCaseTest4.method = testCaseTest4.testFailedResultFormatting;
console.log(testCaseTest4.run().summary());

let testCaseTest5 = new TestCaseTest();
testCaseTest5.method = testCaseTest5.testSuite;
console.log(testCaseTest5.run().summary());





let suite = new TestSuite();

let testCaseTest1 = new TestCaseTest();
testCaseTest1.method = testCaseTest1.testTemplateMethod;
// ↓これ定義が違うからできなくない？
suite.add(testCaseTest1);

