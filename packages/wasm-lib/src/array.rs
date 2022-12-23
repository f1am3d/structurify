pub mod arrays {
    use wasm_bindgen::prelude::*;
    use std::cmp::Ordering;

    type Item = i8;
    type ArrayItems = [Item];

    #[wasm_bindgen]
    pub struct Array {}

    #[wasm_bindgen]
    impl Array {
        pub fn sort(items: &mut ArrayItems, order: u8) {
            return items.sort_by(
                |a, b| -> Ordering {
                    if order == 0 {
                        return Self::compare_function(a, b);
                    }
                    else {
                        return Self::compare_function(b, a);
                    }
                }
            );
        }

        fn compare_function(a: &Item, b: &Item) -> Ordering {
            if a > b {
                return Ordering::Greater;
            }
            else if a < b {
                return Ordering::Less;
            }

            return Ordering::Equal;
        }
    }
}
