type Value = i32;
type Items = [i32];

fn has(value: Value, items: &Items) -> i32 {
    let mut result = -1;

    for (i, &item) in items.iter().enumerate() {
        if item == value {
            result = i as i32;

            break;
        }
    }

    return result;
}

