import { initialize } from '@f1am3d/structurify-lib/src/main';
import { StructurifySet } from '@f1am3d/structurify-lib/src/tuple-set';


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

    this.outputLine(`STANDARD SET: ${time}ms for ${this.arrLength} items`);
  }

  // wasm Set.has benchmark
  async benchmarkWasmSet() {
    await initialize();

    this.testData = new StructurifySet(this.values);
    let time = Date.now();

    this.testData.has(123);
    time -= Date.now();

    this.outputLine(`WASM SET: ${time}ms for ${this.arrLength} items`);
  }
}

document.addEventListener('DOMContentLoaded', () => new TestPage());