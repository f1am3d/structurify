import { Set as StSet } from "wasm-core";

export type TupleSetValue = string | number | boolean | null | undefined;

export class StructurifySet<T extends TupleSetValue> extends Set implements Set<TupleSetValue> {
  private readonly items: T[] = [];

  constructor(value?: T[]){
    super(value);
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

  get size(): number {
    return this.items.length;
  }

  has(value: T): boolean {
    if(typeof value === 'number'){
      const result = StSet.has(
        value,
        new Int8Array(this.items as number[])
      );

      return Boolean(result);
    }

    return false;
  }
}