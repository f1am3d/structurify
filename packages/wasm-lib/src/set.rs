pub mod set {
    use wasm_bindgen::prelude::*;

    type Item = i8;
    type ArrayItems = [Item];

    #[wasm_bindgen]
    pub struct Set {}

    #[wasm_bindgen]
    impl Set {
        pub fn has(value: Item, items: &ArrayItems) -> Item {
            let mut result = -1 as Item;

            for (i, &item) in items.iter().enumerate() {
                if item == value {
                    result = i as Item;

                    break;
                }
            }

            return result;
        }
    }
}
