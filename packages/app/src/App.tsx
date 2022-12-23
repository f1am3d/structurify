import { initialize, StructurifySet } from '@f1am3d/structurify';
import { Component } from 'react';
import './App.css';


class TestPage {
  arrLength = 10 ** 1000;
  values: number[];
  testData = new Set<number>();

  logText: string = '';

  startButton?: HTMLButtonElement;
  outputTextArea?: HTMLTextAreaElement;

  constructor() {
    this.values = Array.from({ length: this.arrLength }, () => Math.floor(Math.random() * this.arrLength));

    this.initIO();
  }

  private initIO() {
    this.startButton = document.querySelector('#startButton') as HTMLButtonElement;
    this.outputTextArea = document.querySelector('#output') as HTMLTextAreaElement;

    if (this.startButton) {
      this.startButton.addEventListener('click', () => {
        this.benchmarkStandardSet();
        this.benchmarkWasmSet();
      });
    }
  }

  private outputLine(text: string) {
    this.logText += `${ text } \n`;

    if (this.outputTextArea) {
      this.outputTextArea.innerText += this.logText;
    }
  }

  // standard Set.has benchmark
  benchmarkStandardSet() {
    this.testData = new Set(this.values);
    let time = Date.now();

    this.testData.has(123);
    time -= Date.now();

    this.outputLine(`STANDARD SET: ${ time }ms for ${ this.arrLength } items`);
  }

  // wasm Set.has benchmark
  async benchmarkWasmSet() {
    await initialize();

    this.testData = new StructurifySet(this.values);
    let time = Date.now();

    this.testData.has(123);
    time -= Date.now();

    this.outputLine(`WASM SET: ${ time }ms for ${ this.arrLength } items`);
  }
}

class App extends Component {
  state = {
    output: ''
  };
  arrLength = 10 ** 7;
  values: number[];
  testData = new Set<number>();
  logText = '';

  constructor(props: any) {
    super(props);


    this.values = [...this.rnd(this.arrLength)];
  }

  private * rnd(length: number) {
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


  render() {
    return (
      <div className="App">
        <button onClick={ () => this.runBenchmarks() }>Start</button>

        <br/>

        <textarea
          id="output"
          value={ this.state.output }
          readOnly
        ></textarea>
      </div>
    );
  }
}

export default App;
