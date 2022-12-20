export type TupleSetValue = string | number | boolean | null | undefined;

export class StructurifySet<T extends [...TupleSetValue[]]> extends Set implements Set<T> {
  private readonly items: T[] = [];

  constructor(value?: T){
    super();

    if(value){

    }
  }

  add(value: T): this {
    if (!this.has(value)) {
      this.items.push(value);
    }

    return this;
  };

  clear(): void {
    this.items.length = 0;
  }

  delete(value: T): boolean;

  forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void;

  get size(): number {
    return 0;
  }

  has(value: T): boolean {
    let result = false;

    for (const item of this.items) {
      let allEqual = true;

      for (const index in value) {
        if (value[index] !== item[index]) {
          allEqual = false;
        }
      }

      if (allEqual) {
        result = true;
        break;
      }
    }

    return result;
  }
}