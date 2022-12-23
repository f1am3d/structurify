use wasm_bindgen::prelude::*;


#[wasm_bindgen]
pub fn fibonacci(steps: i16) -> i64 {
    let mut result = 0;
    let mut previous1 = 1;
    let mut previous2 = 0;

    for step in 0..steps {
        result = previous1 + previous2;

        previous2 = previous1;
        previous1 = result;
    }

    return result;
}