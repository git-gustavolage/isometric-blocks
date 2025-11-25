const json = {
    "phase1": {
        "name": 1,
        "paterns": [
            {
                "blocks": [{ i: 0, j: 0, k: 0 }, { i: 1, j: 1, k: 0 }, { i: 1, j: 1, k: 2 }],
                "duration": 300
            },
            {
                "blocks": [{ i: 0, j: 1, k: 0 }, { i: 1, j: 2, k: 0 }, { i: 2, j: 3, k: 0 }, { i: 3, j: 2, k: 0 }, { i: 4, j: 1, k: 0 }],
                "duration": 250
            }
        ],
    }
}

let last = null;

export function patternPicker() {
    const patterns = json.phase1.paterns.map(item => item.blocks);

    if (patterns.length === 0) return null;
    if (patterns.length === 1) return patterns[0];

    let index;
    do {
        index = Math.floor(Math.random() * patterns.length);
    } while (index === last);

    last = index;
    return patterns[index];
}
