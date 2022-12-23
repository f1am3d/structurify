import { initialize, StructurifySet, fibonacci as wasmFibonacci } from '@f1am3d/structurify';
import { Component } from 'react';
import './App.css';
import { fibonacci } from './lib/fibonaci';


class App extends Component {
  state = {
    output: ''
  };
  arrLength = 10 ** 7;
  fibonacciSteps = 10 ** 8;
  values: number[] = [];
  testData = new Set<number>();
  logText = '';

  constructor(props: any) {
    super(props);
  }

  private* rnd(length: number) {
    for (let i = 0; i < length; i++) {
      yield Math.random() * length | 0;
    }
  }

  private outputLine(text: string) {
    this.logText += `${ text } \n`;

    this.setState({
      output: this.logText
    });
  }

  runBenchmarks() {
    this.values = [...this.rnd(this.arrLength)];

    this.benchmarkStandardSet();
    this.benchmarkWasmSet();
  }

  // standard Set.has benchmark
  benchmarkStandardSet() {
    this.testData = new Set(Array.from(this.values));
    let time = performance.now();

    this.testData.has(123);

    time = performance.now() - time;

    this.outputLine(`STANDARD SET: ${ time }ms for ${ this.arrLength } items`);
  }

  // wasm Set.has benchmark
  async benchmarkWasmSet() {
    await initialize();

    this.testData = new StructurifySet(Array.from(this.values));
    let time = performance.now();

    this.testData.has(123);
    time = performance.now() - time;

    this.outputLine(`WASM SET: ${ time }ms for ${ this.arrLength } items`);
  }

  private runBenchFunction(callback: Function){
    let time = performance.now();

    callback();

    return performance.now() - time;
  }

  benchFibonacci() {
    this.benchFibonacciJs();
    this.benchFibonacciWasm();
  }

  benchFibonacciJs(): any {
    let value;

    const result = this.runBenchFunction(() => {
      value = fibonacci(this.fibonacciSteps);
    })

    this.outputLine(`JS FIBONACCI: ${ result } ms for ${ this.fibonacciSteps } steps.`);
    console.log(`VALUE: ${ value }`);
  }

  benchFibonacciWasm(): any {
    let value;
    const result = this.runBenchFunction(() => {
      value = Number(wasmFibonacci(this.fibonacciSteps));

    })

    this.outputLine(`WASM FIBONACCI: ${ result }ms for ${ this.fibonacciSteps } steps.`);
    console.log(`VALUE: ${ value }`);
  }

  render() {
    return (
      <div className="App">

        <div className="column">
          <button onClick={ () => this.benchFibonacci() }>bench fibonacci</button>
        </div>

        <div className="column">
          <textarea
            id="output"
            value={ this.state.output }
            readOnly
          ></textarea>
        </div>

      </div>
    );
  }
}

export default App;
