class TestCase {
  public name: string;
  public constructor(name: string) {
    this.name = name;
  }

  public run() {
    switch(this.name) {
      case "testMethod":
        this.testMethod();
        break;
    }
  }
}

class WasRun extends TestCase {
  public wasRun: boolean;
  public constructor(name: string) {
    super(name);
    this.wasRun = false;
  }

  // wasRun フラグはこちらの子クラス特有のプロパティだが、
  // case で testMethod を呼ぶのは親クラスのしごとになってしまっているので、
  // 役割分担がうまくできない。
  public testMethod() {
    this.wasRun = true;
  }
}

let test = new WasRun("testMethod");
console.log(test.wasRun);
test.run();
console.log(test.wasRun);
