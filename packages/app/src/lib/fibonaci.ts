
export function fibonacci(steps: number): number {
  let result = 0;
  let previous1 = 1;
  let previous2 = 0;

  for (let step = 0; step < steps; step++) {
    result = previous1 + previous2;

    previous2 = previous1;
    previous1 = result;
  }

  return result;
}